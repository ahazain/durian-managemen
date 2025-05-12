const cron = require("node-cron");
const tandaiAlfa = require("../jobs/absensiJob");

cron.schedule("0 10 * * *", async () => {
  console.log("[CRON] Menandai ALFA...");
  await tandaiAlfa();
  console.log("[CRON] Selesai menandai ALFA");
});
