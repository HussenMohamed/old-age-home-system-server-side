const { pool } = require("../../model/db.config");

const getMedicalRecordsFromDb = async () => {
  try {
    // Execute the SQL query to insert a get family members from the database
    const [result] = await pool.execute(
      `SELECT m.MedicalRecordID, r.Name, r.Age, m.weight, m.height, m.bloodType FROM resident r JOIN medicalrecord m ON r.ResidentID = m.ResidentID;`
    );
    console.log(`From roles query`);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { getMedicalRecordsFromDb };
