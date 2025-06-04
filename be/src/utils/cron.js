const cron = require("node-cron");
const tandaiAlpha = require("../jobs/absensiJob");

// Jalankan setiap hari jam 17:00 (5 PM)
cron.schedule("35 17 * * *", async () => {
  console.log("[CRON] ==========================================");
  console.log("[CRON] Memulai cronjob menandai ALPHA...");
  try {
    await tandaiAlpha();
    console.log("[CRON] Cronjob menandai ALPHA berhasil diselesaikan");
  } catch (error) {
    console.error("[CRON] Error dalam cronjob menandai ALPHA:", error);
  }
  console.log("[CRON] ==========================================");
});

// Optional: Tambahkan cronjob lain jika diperlukan
// Contoh: reset status harian, backup data, dll

console.log("[CRON] Cronjob scheduler telah diinisialisasi");
console.log("[CRON] - Menandai ALPHA: Setiap hari jam 18:00");
