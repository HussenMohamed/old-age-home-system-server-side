const express = require("express");
const router = express.Router();
const updateReqController = require("../../../controllers/updateReqController.js");

router.put("/:reqId", updateReqController.handleUserRequest);

module.exports = router;
