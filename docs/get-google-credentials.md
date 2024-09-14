# Setting Up Google Sheets API Credentials

This guide will walk you through the process of obtaining the `credentials.json` file from Google, which is necessary for authenticating and accessing Google Sheets API in your application.

## Step-by-Step Process

1. **Create a Google Cloud Project**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Click on the project dropdown at the top of the page
   - Click "New Project"
   - Enter a name for your project and click "Create"

2. **Enable Google Sheets API**
   - In the Google Cloud Console, ensure your new project is selected
   - Click on the hamburger menu (≡) in the top-left corner
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on "Google Sheets API" in the results
   - Click the "Enable" button

3. **Configure OAuth Consent Screen**
   - In the left sidebar, click on "OAuth consent screen"
   - Choose "External" as the user type (unless you're using a Google Workspace account)
   - Click "Create"
   - Fill in the required fields:
     - App name
     - User support email
     - Developer contact information
   - Click "Save and Continue"
   - On the "Scopes" page, click "Save and Continue" (we'll add scopes later)
   - On the "Test users" page, add your Google account email
   - Click "Save and Continue"

4. **Create Credentials**
   - In the left sidebar, click on "Credentials"
   - Click "Create Credentials" at the top of the page
   - Select "OAuth client ID" from the dropdown

5. **Configure OAuth Client**
   - For Application type, select "Desktop app"
   - Give your OAuth client a name
   - Click "Create"

6. **Download Credentials**
   - After creating the OAuth client, you'll see a pop-up with your client ID and client secret
   - Click "Download JSON"
   - This downloaded file is your `credentials.json`

7. **Move and Rename the File**
   - Move the downloaded JSON file to your project directory
   - Rename it to `credentials.json`

8. **Set Up API Scopes**
   - Go back to "OAuth consent screen" in the left sidebar
   - Click "Edit App"
   - Go to the "Scopes" section
   - Click "Add or Remove Scopes"
   - In the filter box, type "https://www.googleapis.com/auth/spreadsheets.readonly"
   - Check the box next to this scope
   - Click "Update"

9. **Secure Your Credentials**
   - Add `credentials.json` to your `.gitignore` file to prevent it from being committed to version control

## Important Notes

- Keep your `credentials.json` file secure and do not share it publicly.
- The OAuth consent screen will be in "Testing" mode by default, which is sufficient for development.
- If you plan to release your app publicly or use it for a wider audience, you'll need to go through Google's verification process.

## Next Steps

After obtaining your `credentials.json`, you can use it in your application to authenticate and access the Google Sheets API. Refer to the main project README for instructions on how to use these credentials in your code.
