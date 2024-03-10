const { pool } = require("../../model/db.config");

const addStafftoDb = async (username, phoneNumber, email, roleId, shift) => {
  try {
    // Execute the SQL query to insert a new user into the database
    const [result1] = await pool.execute(
      `INSERT INTO user (Username, Password, PhoneNumber, Email, Role, Status , StaffRoleId) VALUES (?,?,?,?,?,?,?)`,
      [username, "0000", phoneNumber, email, "Staff", "Accepted", roleId]
    );

    // Check if the insertion was successful
    if (result1.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw { statusCode: 500, message: "Failed to insert user into the users Table" };
    }

    // Execute the SQL query to insert the same user into the staff table
    const [result2] = await pool.execute(
      `INSERT INTO staff (Name, RoleId, PhoneNumber, ShiftId, UserId) VALUES (?,?,?,?,?)`,
      [username, roleId, phoneNumber, shift, result1.insertId]
    );

    // Check if the insertion was successful
    if (result2.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw { statusCode: 500, message: "Failed to insert user into the Staff Table" };
    }

    // Return the insertId
    return result2.insertId;
  } catch (error) {
    // Log the error
    console.error("Error adding role to the database:", error.message);

    // Re-throw the error to propagate it up the call stack
    throw error;
  }
};

module.exports = { addStafftoDb };
