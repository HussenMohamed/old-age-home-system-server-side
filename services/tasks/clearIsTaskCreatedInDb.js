const { pool } = require("../../model/db.config");

const clearIsTaskCreatedInDb = async () => {
  try {
    const [result] = await pool.execute(`UPDATE scheduletime SET isTaskCreated = 0;`);

    // Check if the insertion was successful
    if (result.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw { statusCode: 500, message: "Failed to clearIsTaskCreatedInDb " };
    }

    // return result.insertId;
  } catch (error) {
    // Log the error
    console.error("Error clearIsTaskCreatedInDb:", error.message);

    // Re-throw the error to propagate it up the call stack
    throw error;
  }
};

module.exports = { clearIsTaskCreatedInDb };
