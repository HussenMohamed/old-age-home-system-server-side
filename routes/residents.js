const express = require("express");
const router = express.Router();

router.post("/", require("../controllers/addResident.js"));

module.exports = router;
