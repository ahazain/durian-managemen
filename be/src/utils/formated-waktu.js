const dayjs = require("dayjs");
require("dayjs/locale/id"); // load locale Indonesia
dayjs.locale("id"); // set lokal ke bahasa Indonesia

function formatTanggalIndonesia(dateString) {
  return dayjs(dateString).format("D MMMM YYYY HH.mm") + " WIB";
}

module.exports = { formatTanggalIndonesia };
