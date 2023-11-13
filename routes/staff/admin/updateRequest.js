const express = require("express");
const router = express.Router();
const updateReqController = require("../../../controllers/updateReqController.js");

router.patch("/:reqId", updateReqController.handleUserRequest);

module.exports = router;
