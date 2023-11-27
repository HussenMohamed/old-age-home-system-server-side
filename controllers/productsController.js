const { getSupplierId, createProduct } = require("../services/inventory/createProduct.js");
const handleNewProduct = async (req, res) => {
  try {
    const { productName, category, description, stockThreshold, expirationDate, supplierName } =
      req.body;
    // get supplierId to create a foreign key constraint between the product and the supplier
    const supplierId = await getSupplierId(supplierName);
    // create new product
    const productId = await createProduct(
      productName,
      category,
      description,
      stockThreshold,
      expirationDate,
      supplierId
    );
    return res
      .status(201)
      .json({ success: `New Product ${productId} added | Supplier ID: ${supplierId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `from Products Controller => ${err.message}` });
  }
};
module.exports = handleNewProduct;
