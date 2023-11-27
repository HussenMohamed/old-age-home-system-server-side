const { pool } = require("../../model/db.config");

const addPurchaseReqToDb = async (productID, quantityRequested) => {
  try {
    // Execute the SQL query to get the supplier id
    const [result] = await pool.execute(
      `INSERT INTO purchaserequest (ProductID, QuantityRequested) VALUES (?,?)`,
      [productID, quantityRequested]
    );
    // Check if the insertion was successful
    if (result.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw {
        statusCode: 500,
        message: "Failed to insert Product into the database",
      };
    }
    // Return the insertId
    return result.insertId;
  } catch (error) {
    // Log the error
    console.error("Error Getting Supplier Id to the database:", error.message);

    // Re-throw the error to propagate it up the call stack
    throw error;
  }
};
const createProduct = async (
  productName,
  category,
  description,
  stockThreshold,
  expirationDate,
  supplierId
) => {
  try {
    // Execute the SQL query to insert a product into the database
    const [result] = await pool.execute(
      `INSERT INTO inventory (ProductName, category, Description, StockThreshold, ExpirationDate, SupplierID) VALUES (?,?,?,?,?,?)`,
      [productName, category, description, stockThreshold, expirationDate, supplierId]
    );

    // Check if the insertion was successful
    if (result.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw {
        statusCode: 500,
        message: "Failed to insert Product into the database",
      };
    }
    // Return the insertId
    return result.insertId;
  } catch (error) {
    // Log the error
    console.error("Error adding Products to the database:", error.message);

    // Re-throw the error to propagate it up the call stack
    throw error;
  }
};

const RequestStateInDb = async (purchaseRequestId, state) => {
  try {
    const [result] = await pool.query(
      "UPDATE purchaserequest SET State = ? WHERE PurchaseRequestID = ?",
      [state, purchaseRequestId]
    );
    // Check if the insertion was successful
    if (result.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw {
        statusCode: 500,
        message: "Failed to Update Purchase Request State in the database",
      };
    }
    return result.affectedRows;
  } catch (err) {
    // Handle any errors that might occur during the database operation
    console.error("Error updating Purchase request state:", err.message);
    throw err; // Re-throw the error to let the calling function handle it
  }
};
module.exports = { addPurchaseReqToDb, createProduct, RequestStateInDb };
