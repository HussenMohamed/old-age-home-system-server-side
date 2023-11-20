const express = require("express");
const router = express.Router();
router.post("/", require("../controllers/RolesController.js"));

module.exports = router;
