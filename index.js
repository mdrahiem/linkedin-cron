import dotenv from "dotenv";
import cron from "node-cron";
import { getGoogleSheetData } from "./get-google-sheet-data.js";
import { postToLinkedIn } from "./post-to-linkedin.js";

dotenv.config();

const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const RANGE = process.env.GOOGLE_SPREADSHEET_RANGE;

async function processAndPost() {
  try {
    console.log("Fetching data from Google Sheets...", SPREADSHEET_ID, RANGE);
    const data = await getGoogleSheetData(SPREADSHEET_ID, RANGE);
    console.log("Data fetched:", data);
    if (data && data.length > 0) {
      const postContent = formatDataForLinkedIn(data[0]); // Format the first row of data for posting
      await postToLinkedIn(LINKEDIN_ACCESS_TOKEN, postContent);
      console.log("Posted to LinkedIn successfully");
    } else {
      console.log("No data to post");
    }
  } catch (error) {
    console.error("Error in processing and posting:", error);
  }
}

function formatDataForLinkedIn(data) {
  // Implement your logic to format the data into a LinkedIn post
  // This is just a simple example
  return `Check out our latest update:\n${JSON.stringify(data)}`;
}

// Schedule the task to run every hour
cron.schedule("0/2 * * * * *", () => {
  console.log("Running scheduled task");
  processAndPost();
});

console.log("Scheduler started");
