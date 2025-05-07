const response = require("../utils/response");
const authService = require("../service/autentifikasi-service");

class AutentifikasiController {
  static async register(req, res) {
    try {
      const { nama, email, password, role } = req.body;
      const data = await authService.register({ nama, email, password, role });
      response.created(res, data, "berhasil register");
    } catch (error) {
      response.error(res, error);
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await authService.login({ email, password });
      response.success(res, data, "berhasil login");
    } catch (error) {
      response.error(res, error);
    }
  }
}

module.exports = AutentifikasiController;
