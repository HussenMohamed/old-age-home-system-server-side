const { pool } = require("../../model/db.config");

const getSpecificProductFromDb = async (productId) => {
  try {
    // Execute the SQL query to insert a get rooms from the database
    const [result] = await pool.execute(`SELECT * FROM products where ProductID = ?`, [productId]);

    result[0].ExpirationDate = new Date(result[0].ExpirationDate).toLocaleDateString();
    return result[0];
  } catch (error) {
    return error;
  }
};

module.exports = { getSpecificProductFromDb };
