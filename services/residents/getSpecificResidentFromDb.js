const { pool } = require("../../model/db.config");

const getSpecificResidentFromDb = async (residentId) => {
  try {
    // Execute the SQL query to insert a get roles from the database
    const [result] = await pool.execute(`SELECT * From resident WHERE ResidentID = ?;`, [
      residentId,
    ]);
    // Convert ISO date strings to readable format
    const residents = result.map((resident) => {
      // Convert BirthDate to readable format
      resident.BirthDate = new Date(resident.BirthDate).toLocaleDateString();

      // Convert JoiningDate to readable format
      resident.JoiningDate = new Date(resident.JoiningDate).toLocaleDateString();

      return resident;
    });
    console.log(`From specific resident query`);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { getSpecificResidentFromDb };
