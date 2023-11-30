const { pool } = require("../../model/db.config");

const findUser = async (username) => {
  try {
    // Check if username or email or phoneNumber already exist in the database
    const [rows] = await pool.query(
      "SELECT * FROM user WHERE username = ? AND Status = 'Accepted' ",
      [username]
    );

    return rows[0];
  } catch (error) {
    // Handle any error that might occur during the database query
    console.error("Error Finding the user:", error.message);
    throw error; // Re-throw the error to let the calling function handle it
  }
};

module.exports = { findUser };
