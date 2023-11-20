const { pool } = require("../../model/db.config");

const addRoleToDb = async (roleName, roleDescription) => {
  try {
    // Execute the SQL query to insert a new role into the database
    const [result] = await pool.execute(
      `INSERT INTO roles (RoleName, RoleDescription) VALUES (?,?)`,
      [roleName, roleDescription]
    );

    // Check if the insertion was successful
    if (result.affectedRows === 0) {
      // If no rows were affected, throw an error indicating a failed insertion
      throw { statusCode: 500, message: "Failed to insert role into the database" };
    }

    // Return the insertId
    return result.insertId;
  } catch (error) {
    // Log the error
    console.error("Error adding role to the database:", error.message);

    // Re-throw the error to propagate it up the call stack
    throw error;
  }
};

module.exports = { addRoleToDb };
