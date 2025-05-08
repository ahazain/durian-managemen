const jwt = require("jsonwebtoken");
const envConfig = require("../configs/env-config");
const { UnauthorizedError } = require("../utils/error-handling");

function verifyJWT(req, res, next) {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return next(new UnauthorizedError("Authorization tidak ditemukan"));
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return next(new UnauthorizedError("Token tidak ditemukan"));
  }
  jwt.verify(token, envConfig.secretKey, (error, user) => {
    if (error) {
      return next(new UnauthorizedError("Token tidak valid"));
    }
    req.user = user;
    next();
  });
}

function verifyRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(new UnauthorizedError("Role tidak ditemukan"));
    }
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return next(new UnauthorizedError("Akses ditolak"));
    }
    next();
  };
}

module.exports = {
  verifyJWT,
  verifyRole,
};
