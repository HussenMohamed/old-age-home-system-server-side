const { pool } = require("../../model/db.config");

const getStaffFromDb = async () => {
  try {
    // Execute the SQL query to insert a get roles from the database
    const [result] = await pool.execute(
      `SELECT s.StaffID, s.Name, r.RoleName, s.PhoneNumber, TIME_FORMAT(sh.StartTime, '%H:%i') AS StartTime, TIME_FORMAT(sh.EndTime, '%H:%i') AS EndTime FROM staff s JOIN roles r ON s.RoleID = r.RoleID JOIN shift sh ON s.ShiftID = sh.ShiftID;`
    );
    // Process the result to combine StartTime and EndTime into ShiftTime
    const staffWithShiftTime = result.map((row) => ({
      ...row,
      ShiftTime: `${row.StartTime} - ${row.EndTime}`,
    }));
    return staffWithShiftTime;
  } catch (error) {
    return error;
  }
};

module.exports = { getStaffFromDb };
