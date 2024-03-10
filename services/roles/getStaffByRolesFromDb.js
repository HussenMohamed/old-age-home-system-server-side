const { pool } = require("../../model/db.config");

const getStaffByRolesFromDb = async () => {
  try {
    // Execute the SQL query to insert a get roles from the database
    const [result] = await pool.execute(
      `SELECT staff.StaffID, staff.name AS staffMemberName, roles.roleName FROM staff JOIN roles ON staff.RoleID = roles.RoleID`
    );
    // Extract role names from the result
    // const roleNames = result.map((row) => row.RoleName);
    // Return the role names
    console.log(`From getStaffByRolesFromDb query`);
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { getStaffByRolesFromDb };
