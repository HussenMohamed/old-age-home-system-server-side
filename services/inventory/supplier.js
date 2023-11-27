const { pool } = require("../../model/db.config");
const addSupplierToDb = async (SupplierName, ContactInformation) => {
  try {
    // Execute the SQL query to insert new supplier
    const [result] = await pool.execute(
      `INSERT INTO supplier (SupplierName, ContactInformation) VALUES (?,?)`,
      [SupplierName, ContactInformation]
    );
    // Check if the insertion was successful
    if (result.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw {
        statusCode: 500,
        message: "Failed to insert Supplier into the database",
      };
    }
    // Return the insertId
    return result.insertId;
  } catch (error) {
    // Log the error
    console.error("Error Adding Supplier to the database:", error.message);

    // Re-throw the error to propagate it up the call stack
    throw error;
  }
};
module.exports = { addSupplierToDb };
