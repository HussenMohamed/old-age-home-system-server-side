const express = require("express");
const router = express.Router();

router.post("/", require("../controllers/supplierController.js"));

module.exports = router;
