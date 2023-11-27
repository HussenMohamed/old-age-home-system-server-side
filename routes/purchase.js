const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController.js");
router.post("/", purchaseController.handlePurchaseRequest);
router.patch("/:purchaseRequestId", purchaseController.changePurchaseRequestState);
module.exports = router;
