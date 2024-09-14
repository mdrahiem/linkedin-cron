# Setting Up LinkedIn API Credentials

This guide will walk you through the process of obtaining the necessary credentials (Client ID and Client Secret) from LinkedIn, which are required for authenticating and accessing the LinkedIn API in your application.

## Step-by-Step Process

1. **Create a LinkedIn Developer Account**
   - Go to the [LinkedIn Developers portal](https://www.linkedin.com/developers/)
   - Sign in with your LinkedIn account or create one if you don't have it

2. **Create a New Application**
   - Once logged in, click on "Create app" button
   - Fill in the required information:
     - App name: Choose a name for your application
     - LinkedIn Page: Select your company's LinkedIn page (or your personal page)
     - App logo: Upload a logo for your app (you can change this later)
   - Check the legal agreement box and click "Create app"

3. **Configure OAuth 2.0 Settings**
   - In your app's dashboard, go to the "Auth" tab
   - Under "OAuth 2.0 settings", you'll find:
     - Client ID: Note this down
     - Client Secret: Click "Generate new client secret" and note it down immediately (you won't be able to see it again)

4. **Set Redirect URLs**
   - Still in the "Auth" tab, under "OAuth 2.0 settings"
   - In the "Authorized redirect URLs" section, add:
     `http://localhost:3000/callback`
   - This URL should match the redirect URI you'll use in your application

5. **Request API Access**
   - Go to the "Products" tab
   - Request access to the APIs you need. For posting, you'll likely need:
     - Share on LinkedIn
     - Sign In with LinkedIn
   - You may need to provide additional information about your app's use case

6. **Set Application Permissions**
   - In the "Products" tab, under each API you've been granted access to
   - Select the specific permissions your app requires (e.g., r_liteprofile, w_member_social)

7. **Verify Your Application**
   - LinkedIn may require you to verify your application, especially if you're requesting sensitive permissions
   - Follow the verification process if prompted

8. **Store Your Credentials Securely**
   - Create a `.env` file in your project root (if not already present)
   - Add your LinkedIn credentials:
     ```
     LINKEDIN_CLIENT_ID=your_client_id_here
     LINKEDIN_CLIENT_SECRET=your_client_secret_here
     ```
   - Make sure to add `.env` to your `.gitignore` file to keep these credentials secure

## Important Notes

- Keep your Client ID and Client Secret confidential. Never share them publicly or commit them to version control.
- The redirect URL you set in the LinkedIn application settings must exactly match the one you use in your application code.
- LinkedIn's API access is quite restrictive. Make sure your application complies with their [API Terms of Use](https://legal.linkedin.com/api-terms-of-use).

## Next Steps

After obtaining your LinkedIn API credentials, you can use them in your application to authenticate and access the LinkedIn API. Refer to the main project README for instructions on how to use these credentials in your code.

## Troubleshooting

- If you encounter issues with permissions, double-check that you've requested and been granted access to the necessary APIs in the "Products" tab.
- For any API-related errors, consult the [LinkedIn API documentation](https://docs.microsoft.com/en-us/linkedin/consumer/) for detailed information on endpoints and request formats.
