import { TwitterApi } from "twitter-api-v2";
import { getImageBuffer } from "./utils/imageUtils.js";
import { splitTextIntoTweets } from "./utils/tweet-utils.js";
import dotenv from "dotenv";

dotenv.config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const bearer = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
// To read tweets from Twitter
const twitterBearer = bearer.readOnly;
// To write tweets to Twitter
const twitterClient = client.readWrite;

async function postToTwitter(text, imagePath) {
  try {
    const imageBuffer = await getImageBuffer(imagePath);

    let mediaId;
    if (imageBuffer) {
      mediaId = await twitterClient.v1.uploadMedia(imageBuffer, {
        type: "png",
      });
    }

    // Twitter has a 280 character limit for tweets
    const tweet = await twitterClient.v2.tweet(text.slice(0, 280), {
      media: mediaId ? { media_ids: [mediaId] } : undefined,
    });

    console.log("Posted to Twitter:", tweet.data.id);
    return tweet.data.id;
  } catch (error) {
    console.error("Error posting to Twitter:", error);
    throw error;
  }
}

async function postTwitterThread(text, imagePath) {
  // Split the text into chunks of 280 characters
  const chunks = splitTextIntoTweets(text);

  console.log("Posting thread to Twitter:", chunks, "tweets");

  let lastTweetId = null;

  for (let i = 0; i < chunks.length; i++) {
    let chunk = chunks[i];

    if (i === 0) {
      // For the first tweet, add thread indication and image
      chunk = `🧵 Thread:\n\n${chunk}`;

      // Upload the image
      const imageBuffer = await getImageBuffer(imagePath);

      let mediaId;
      if (imageBuffer) {
        mediaId = await twitterClient.v1.uploadMedia(imageBuffer, {
          type: "png",
        });
      }

      // Post the first tweet with image
      const tweet = await twitterClient.v2.tweet(chunk, {
        media: mediaId ? { media_ids: [mediaId] } : undefined,
      });
      lastTweetId = tweet.data.id;
    } else {
      // Post reply tweets
      const tweet = await client.v2.reply(chunk, lastTweetId);
      lastTweetId = tweet.data.id;
    }
  }

  console.log("Thread posted successfully");
}

function splitTextIntoChunks(text, chunkSize) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

export { postToTwitter, postTwitterThread };
