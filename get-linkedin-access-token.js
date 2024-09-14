import dotenv from "dotenv";
import axios from "axios";
import open from "open";
import http from "http";
import url from "url";

dotenv.config();

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_CALLBACK_URL = process.env.LINKEDIN_CALLBACK_URL;
const LINKEDIN_SCOPE = process.env.LINKEDIN_SCOPE;

const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${LINKEDIN_CALLBACK_URL}&scope=${LINKEDIN_SCOPE}`;

console.log(
  "Please authorize this app by visiting this url:",
  authorizationUrl,
);
open(authorizationUrl);

const server = http.createServer(async (req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === "/callback") {
    const authorizationCode = query.code;
    console.log("Authorization Code:", authorizationCode);

    // Exchange authorization code for access token
    try {
      const tokenResponse = await axios.post(
        "https://www.linkedin.com/oauth/v2/accessToken",
        null,
        {
          params: {
            grant_type: "authorization_code",
            code: authorizationCode,
            client_id: LINKEDIN_CLIENT_ID,
            client_secret: LINKEDIN_CLIENT_SECRET,
            redirect_uri: LINKEDIN_CALLBACK_URL,
          },
        },
      );

      console.log("Access Token:", tokenResponse.data.access_token);
      res.end("Authentication successful! You can close this window.");
      server.close();
    } catch (error) {
      console.error(
        "Error getting access token:",
        error.response?.data || error.message,
      );
      res.end("Authentication failed. Check the console for details.");
      server.close();
    }
  }
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
