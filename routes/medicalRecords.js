const express = require("express");
const router = express.Router();
router.post("/:residentId", require("../controllers/medRecController.js"));

module.exports = router;
