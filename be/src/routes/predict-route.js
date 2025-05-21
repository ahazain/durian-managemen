// predict.route.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { predictDurian } = require("../controllers/predict.controller");

const upload = multer({ dest: "uploads/" });

router.post("/predict", upload.single("image"), predictDurian);

module.exports = router;
