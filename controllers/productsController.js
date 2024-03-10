const { getSupplierId, createProduct } = require("../services/inventory/createProduct.js");
const { getAllProductsFromDb } = require("../services/inventory/getAllProductsFromDb.js");
const { getSpecificProductFromDb } = require("../services/inventory/getSpecificProduct.js");
const handleNewProduct = async (req, res) => {
  try {
    const { productName, category, description, stockThreshold, expirationDate, currentStock } =
      req.body;
    // create new product
    const productId = await createProduct(
      productName,
      category,
      description,
      stockThreshold,
      expirationDate,
      currentStock
    );
    return res.status(201).json({ success: `Product ${productName} with ID ${productId} added ` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `from Products Controller => ${err.message}` });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsFromDb();
    console.log(products);
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `from Products Controller => ${err.message}` });
  }
};

const getSpecificProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await getSpecificProductFromDb(productId);
    console.log(product);
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `from Products Controller => ${err.message}` });
  }
};

const UpdateItems = async (req, res) => {
  try {
    const { productId } = req.params;
    const { operationType, amount } = req.body;
    const product = await updateItemsAmountInDb(productId, operationType, amount);
    console.log(product);
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `from Products Controller => ${err.message}` });
  }
};
module.exports = { handleNewProduct, getAllProducts, getSpecificProduct };
