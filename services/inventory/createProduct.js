const { pool } = require("../../model/db.config");

const getSupplierId = async (supplierName) => {
  try {
    // Execute the SQL query to get the supplier id
    const [result1] = await pool.execute(`SELECT SupplierID FROM supplier WHERE SupplierName = ?`, [
      supplierName,
    ]);
    // if there is no supplier then create one
    if (result1.length === 0) {
      const [result2] = await pool.execute(`INSERT INTO supplier (SupplierName) VALUES (?)`, [
        supplierName,
      ]);
      return result2.insertId;
    }
    console.log(`Supllier already exists and this is the ID: ${result1[0].SupplierID}`);
    return result1[0].SupplierID;
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
module.exports = { getSupplierId, createProduct };
