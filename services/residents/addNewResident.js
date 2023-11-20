const { pool } = require("../../model/db.config");

const addResidentToDb = async (resident) => {
  try {
    const {
      name,
      birthDate,
      age,
      nationality,
      UNCN,
      permanentAddress,
      maritalStatus,
      numberOfChildren,
      roomNumber,
    } = resident;

    const [result] = await pool.execute(
      `INSERT INTO resident (Name, BirthDate, Age, Nationality, UNCN, PermanentAddress, MaritalStatus, NumberOfChildren, RoomNumber) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        birthDate,
        age,
        nationality,
        UNCN,
        permanentAddress,
        maritalStatus,
        numberOfChildren,
        roomNumber,
      ]
    );

    const insertedResidentId = result.insertId;

    // You can return the inserted resident ID or any other relevant information
    return { residentId: insertedResidentId, message: "Resident added successfully" };
  } catch (error) {
    // Handle any error that might occur during the database query
    console.error("Error adding resident:", error.message);
    throw error; // Re-throw the error to let the calling function handle it
  }
};

module.exports = { addResidentToDb };
