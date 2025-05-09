const dayjs = require("dayjs");
require("dayjs/locale/id"); // load locale Indonesia | january => januari
dayjs.locale("id"); // format tanggal ke indo | January 1, 2025 => 1 Januari 2025

function formatTanggalIndonesia(dateString) {
  return dayjs(dateString).format("D MMMM YYYY HH.mm") + " WIB";
}

module.exports = { formatTanggalIndonesia };
