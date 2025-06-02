// predict.route.js
const express = require("express");
const router = express.Router();
const predictDurian = require("../controllers/predict-controller");
const { verifyJWT } = require("../middlewares/verify-jwt-middleware");

const upload = require("../middlewares/multer-middleware");

router.post("/", verifyJWT, upload.single("image"), predictDurian.predict);

module.exports = router;