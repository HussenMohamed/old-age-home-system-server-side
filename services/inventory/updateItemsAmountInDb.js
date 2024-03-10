const { pool } = require("../../model/db.config");

const getSpecificProductFromDb = async (productId, operationType, amount) => {
  try {
    if (operationType === "add") {
      const [result] = await pool.execute(
        `UPDATE products SET CurrentStock = CurrentStock + ? WHERE ProductID = ?`,
        [amount, productId]
      );
    } else {
      const [result] = await pool.execute(
        `UPDATE products SET CurrentStock = CurrentStock - ? WHERE ProductID = ?`,
        [amount, productId]
      );
    }

    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { getSpecificProductFromDb };
