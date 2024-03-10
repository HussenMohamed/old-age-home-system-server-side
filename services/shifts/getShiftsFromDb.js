const { pool } = require("../../model/db.config");

const getShiftsFromDb = async () => {
  try {
    // Execute the SQL query to insert a get roles from the database
    const [result] = await pool.execute(`SELECT * FROM shift`);
    // Extract role names from the result
    // const roleNames = result.map((row) => row.RoleName);
    // Return the role names
    console.log(`From shifts query`);
    // console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { getShiftsFromDb };
