const express = require("express");
const router = express.Router();

router.post("/", require("../controllers/productsController.js").handleNewProduct);
router.get("/", require("../controllers/productsController.js").getAllProducts);
router.get("/specific", require("../controllers/productsController.js").getSpecificProduct);

module.exports = router;
