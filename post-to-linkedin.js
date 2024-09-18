import axios from "axios";
import fs from "fs/promises";

// before posting the image to LinkedIn, we need to upload it to LinkedIn's servers
async function uploadImageToLinkedIn(accessToken, imagePath, personId) {
  try {
    // Step 1: Initialize upload
    const initResponse = await axios.post(
      "https://api.linkedin.com/v2/assets?action=registerUpload",
      {
        registerUploadRequest: {
          recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
          owner: `urn:li:person:${personId}`,
          serviceRelationships: [
            {
              relationshipType: "OWNER",
              identifier: "urn:li:userGeneratedContent",
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const uploadUrl =
      initResponse.data.value.uploadMechanism[
        "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
      ].uploadUrl;
    const asset = initResponse.data.value.asset;

    // Step 2: Upload the image
    const imageBuffer = await fs.readFile(imagePath);
    await axios.put(uploadUrl, imageBuffer, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/octet-stream",
      },
    });

    return asset;
  } catch (error) {
    console.error(
      "Error uploading image to LinkedIn:",
      error.response?.data || error.message,
    );
    throw error;
  }
}

// Post a text and image to LinkedIn
// The imagePath is the path to the image file on your local machine
async function postToLinkedIn(
  accessToken,
  description,
  imagePath,
  imageDescription,
  imageTitle,
) {
  const url = "https://api.linkedin.com/v2/ugcPosts";
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  // First, get the user's profile information
  const profileResponse = await axios.get(
    "https://api.linkedin.com/v2/userinfo",
    {
      headers,
    },
  );
  const personId = profileResponse.data.sub;

  // If an image path is provided, upload the image to LinkedIn
  const imageAsset = await uploadImageToLinkedIn(
    accessToken,
    imagePath,
    personId,
  );

  const payload = {
    author: `urn:li:person:${personId}`,
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: `${description}`,
        },
        shareMediaCategory: "IMAGE",
        media: [
          {
            status: "READY",
            description: {
              text: imageDescription,
            },
            media: imageAsset,
            title: {
              text: imageTitle,
            },
          },
        ],
      },
    },
  };

  console.log("Posting to LinkedIn:", imageAsset, payload);

  try {
    const response = await axios.post(url, payload, { headers });
    return response.data;
  } catch (error) {
    console.error(
      "Error posting to LinkedIn:",
      error.response?.data || error.message,
    );
    throw error;
  }
}

export { postToLinkedIn };
