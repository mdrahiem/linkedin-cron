import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { readFile } from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

const credentialsPath =
  process.env.NODE_ENV === "production"
    ? "/etc/secrets/credentials.json" // In case of Render.com
    : "credentials.json";
const credentials = JSON.parse(await readFile(credentialsPath, "utf8"));

async function getGoogleSheetData(spreadsheetId, range) {
  try {
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
      spreadsheetId,
      range,
    });
    const rows = response.data.values;
    if (rows && rows.length > 0) {
      const [postText, imageDescription, imageTitle] = rows[0];
      return { postText, imageDescription, imageTitle };
    } else {
      console.log("No data found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    throw error;
  }
}

export { getGoogleSheetData };
