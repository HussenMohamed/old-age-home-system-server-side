const { pool } = require("../../model/db.config");

const getAvailableRoomsFromDb = async () => {
  try {
    // Execute the SQL query to insert a get rooms from the database
    const [result] = await pool.execute(`SELECT * FROM room WHERE Occupancy < MaxCapacity;`);
    console.log(`From get available rooms query`);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { getAvailableRoomsFromDb };
