function trimDoubleLineSpaces(text) {
  // Replace double line breaks with a single line break
  return text
    .replace(/\n\n+/g, "\n\n")
    .replace(/\r\r+/g, "\r\r")
    .replace(/\r\n\r\n+/g, "\r\n\r\n");
}

function splitTextIntoTweets(text, maxLength = 280) {
  // First, trim double line spaces
  text = trimDoubleLineSpaces(text);

  // Split the text into sentences
  const sentences = text.split(/(?<=[.!?]) +/);
  const tweets = [];
  let currentTweet = "";

  for (const sentence of sentences) {
    // If adding the sentence doesn't exceed maxLength, add it to the current tweet
    if (
      (currentTweet + (currentTweet ? " " : "") + sentence).length <= maxLength
    ) {
      currentTweet += (currentTweet ? " " : "") + sentence;
    } else {
      // If the current tweet is not empty, append it to tweets
      if (currentTweet) {
        tweets.push(currentTweet.trim());
      }

      // If the sentence itself is longer than maxLength, we need to split it
      if (sentence.length > maxLength) {
        const words = sentence.split(" ");
        currentTweet = "";
        for (const word of words) {
          if (
            (currentTweet + (currentTweet ? " " : "") + word).length <=
            maxLength
          ) {
            currentTweet += (currentTweet ? " " : "") + word;
          } else {
            tweets.push(currentTweet.trim());
            currentTweet = word;
          }
        }
      } else {
        currentTweet = sentence;
      }
    }
  }

  // remaining text as the last tweet
  if (currentTweet) {
    tweets.push(currentTweet.trim());
  }

  return tweets;
}

export { splitTextIntoTweets };
