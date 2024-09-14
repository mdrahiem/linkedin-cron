# LinkedIn Cron Poster

## Project Overview

This project is an automated system that periodically posts content to LinkedIn using data fetched from a Google Sheet. It utilizes Node.js and various APIs to authenticate with LinkedIn, retrieve data, and schedule posts.

## Project Flow

1. The application authenticates with LinkedIn using OAuth 2.0.
2. It fetches data from a specified Google Sheet.
3. On a scheduled basis, it processes the fetched data and creates a post.
4. The post is then published to LinkedIn automatically.

## File Structure and Descriptions

- `credentials.json`: Contains Google API credentials for accessing Google Sheets.
- `get-google-sheet-data.js`: Script to fetch posts data from Google Sheets.
- `get-linkedin-access-token.js`: By running this script, you can get the LinkedIn access token.
- `post-to-linkedin.js`: Contains the logic to post content to LinkedIn.
- `index.js`: Main entry point of the application, orchestrates the overall flow.

## How It Works

1. **Authentication**:
   - `get-linkedin-access-token.js` manages the OAuth 2.0 flow with LinkedIn.
   - It obtains and refreshes access tokens as needed.
   - When you run this you see a browser window open for LinkedIn authentication.
   - You will need to enter your LinkedIn credentials and authorize the application.

2. **Data Retrieval**:
   - `get-google-sheet-data.js` uses the Google Sheets API to fetch content.
   - It uses `credentials.json` for Google authentication.
   - You can read more about how to fetch credentials in the `get-google-credentials.md` file.

3. **Scheduling**:
   - `index.js` uses a cron job to schedule regular posting.

4. **Posting**:
   - `post-to-linkedin.js` takes the fetched data and creates LinkedIn posts.
   - It uses the LinkedIn API to publish content.
   - You can read more about how to get LinkedIn client secrets in the `get-linkedin-secrets.md` file.


## Setup and Usage

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up `.env` file with necessary API keys and secrets.
4. Ensure `credentials.json` is properly configured for Google Sheets access.
5. Run `node index.js` to start the application.

## Note
Ensure all sensitive information (API keys, tokens) is kept secure and not committed to the repository. The `.gitignore` file should be set up to exclude `.env` and `credentials.json`.
