const { pool } = require("../../model/db.config");

const getAllProductsFromDb = async () => {
  try {
    // Execute the SQL query to insert a get rooms from the database
    const [result] = await pool.execute(`SELECT * FROM products`);
    console.log(`From get All Products From Db query`);
    // Convert ISO date strings to readable format
    const products = result.map((product) => {
      // Convert BirthDate to readable format
      product.ExpirationDate = new Date(product.ExpirationDate).toLocaleDateString();

      return product;
    });
    return products;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllProductsFromDb };
