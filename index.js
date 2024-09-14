const cron = require("node-cron");
const { getSheetData } = require("./getPosts");

cron.schedule("*/10 * * * * *", () => {
  getSheetData();
  console.log("Running a task every hour");
  // Add your scheduled task logic here
});
