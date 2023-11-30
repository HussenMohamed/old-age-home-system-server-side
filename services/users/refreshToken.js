const { pool } = require("../../model/db.config");

const addTokenToDb = async (refreshToken, userId) => {
  try {
    // Check if username or email or phoneNumber already exist in the database
    const [result] = await pool.query("UPDATE user SET RefreshToken = ? WHERE UserID = ?", [
      refreshToken,
      userId,
    ]);

    // return result;
  } catch (error) {
    // Handle any error that might occur during the database query
    console.error("Error adding the refresh token :", error.message);
    return true; // Return true to indicate an error occurred
  }
};
const deleteToken = async (refreshToken) => {
  try {
    // Check if username or email or phoneNumber already exist in the database
    const [result] = await pool.query(
      "UPDATE user SET RefreshToken = NULL WHERE RefreshToken = ?",
      [refreshToken]
    );
    console.log(`Deleting the refresh token, result: ${result}`);
    // return result;
  } catch (error) {
    // Handle any error that might occur during the database query
    console.error("Error adding the refresh token :", error.message);
    return true; // Return true to indicate an error occurred
  }
};

const findRefreshToken = async (refreshToken) => {
  try {
    // Check if username or email or phoneNumber already exist in the database
    const [rows] = await pool.query(
      "SELECT * FROM user WHERE RefreshToken = ? AND Status = 'Accepted' ",
      [refreshToken]
    );

    return rows[0];
  } catch (error) {
    // Handle any error that might occur during the database query
    console.error("Error Finding the user:", error.message);
    throw error; // Re-throw the error to let the calling function handle it
  }
};
module.exports = { addTokenToDb, deleteToken, findRefreshToken };
