const { pool } = require("../../model/db.config");

const createUserRequest = async (user) => {
  try {
    const { username, password, email, phoneNumber, role } = user;
    // Assuming you have a hashed password available
    const [result] = await pool.query(
      "INSERT INTO userrequests (Username, Password, Email, PhoneNumber, Role) VALUES (?, ?, ?, ?, ?)",
      [username, password, email, phoneNumber, role]
    );

    const insertedUserId = result.insertId;

    // You can return the inserted user ID or any other relevant information
    return { userId: insertedUserId, message: "User added successfully" };
  } catch (error) {
    // Handle any error that might occur during the database query
    console.error("Error adding user:", error.message);
    throw error; // Re-throw the error to let the calling function handle it
  }
};

module.exports = { createUserRequest };
