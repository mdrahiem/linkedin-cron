const cron = require("node-cron");

cron.schedule("*/10 * * * * *", () => {
  console.log("Running a task every hour");
  // Add your scheduled task logic here
});
