const { google } = require("googleapis");
const { JWT } = require("google-auth-library");

// Replace these with your own values
const SPREADSHEET_ID = "1ZRD8BH6JaceyoOYxxAiQVikTSMxbmJnnW1gJ3tJL_CM";
const RANGE = "Sheet1!A1:B10"; // Adjust this to your desired range
const CREDENTIALS_PATH = "./credentials.json";

async function getSheetData() {
  try {
    // Load credentials
    const credentials = require(CREDENTIALS_PATH);

    // Authenticate
    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    // Create Google Sheets instance
    const sheets = google.sheets({ version: "v4", auth });

    // Read data from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (rows.length) {
      console.log("Data:", rows);
      // Process your data here
    } else {
      console.log("No data found.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = { getSheetData };
