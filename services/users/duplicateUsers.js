const { pool } = require("../../model/db.config");

const checkDuplicate = async (user) => {
  try {
    const { username, email, phoneNumber } = user;
    // Check if username or email or phoneNumber already exist in the database
    const [rows, fields] = await pool.query(
      "SELECT * FROM user WHERE Username = ? OR Email = ? OR PhoneNumber = ?",
      [username, email, phoneNumber]
    );

    // If any matching row is found, it means there is a duplicate
    const isDuplicate = rows.length === 0 ? false : true;
    return isDuplicate;
  } catch (error) {
    // Handle any error that might occur during the database query
    console.error("Error checking for duplicate:", error.message);
    return true; // Return true to indicate an error occurred
  }
};

module.exports = { checkDuplicate };
