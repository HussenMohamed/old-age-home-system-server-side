const express = require("express");
const router = express.Router();

router.post("/", require("../controllers/productsController.js"));

module.exports = router;
