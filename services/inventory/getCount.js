const { pool } = require("../../model/db.config");

const getCount = async () => {
  try {
    // Execute the SQL query to insert a get rooms from the database
    const [result] = await pool.execute(
      `SELECT COUNT(ProductID) AS TotalProducts, SUM(CurrentStock) AS TotalCurrentStock FROM products;`
    );

    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { getCount };
