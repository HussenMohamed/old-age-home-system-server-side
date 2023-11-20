const { pool } = require("../../model/db.config");

const addShiftToDb = async (startTime, endTime) => {
  try {
    // Execute the SQL query to insert a new shift into the database
    const [result] = await pool.execute(`INSERT INTO shift (StartTime, EndTime) VALUES (?,?)`, [
      startTime,
      endTime,
    ]);

    // Check if the insertion was successful
    if (result.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw { statusCode: 500, message: "Failed to insert shift into the database" };
    }

    // Return the insertId
    return result.insertId;
  } catch (error) {
    // Log the error
    console.error("Error adding shift to the database:", error.message);

    // Re-throw the error to propagate it up the call stack
    throw error;
  }
};

module.exports = { addShiftToDb };
