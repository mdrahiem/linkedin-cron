import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const credentialsPath = join(__dirname, "credentials.json");
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
    if (rows.length) {
      // Assuming the first row contains headers
      const headers = rows[0];
      const data = rows.slice(1).map((row) => {
        let rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index];
        });
        return rowData;
      });
      return data;
    } else {
      console.log("No data found.");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export { getGoogleSheetData };
