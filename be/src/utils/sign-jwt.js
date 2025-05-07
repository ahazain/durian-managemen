const jwt = require("jsonwebtoken");
const envConfig = require("../configs/env-config");

class SignJWT {
  static generateToken(user) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, envConfig.secretKey, { expiresIn: "1h" });
    return token;
  }
}

module.exports = SignJWT;
