const { addResidentToDb } = require("../services/residents/addNewResident.js");
const { getResidentsFromDb } = require("../services/residents/getResidentsFromDb.js");
const { getSpecificResidentFromDb } = require("../services/residents/getSpecificResidentFromDb.js");
const {
  getCountResidentsWithNoMedicalRecordsFromDb,
} = require("../services/residents/getCountResidentsWithNoMedicalRecordsFromDb.js");
const {
  getResidentsWithNoMedicalRecordsFromDb,
} = require("../services/residents/getResidentsWithNoMedicalRecordsFromDb.js");
const addResident = async (req, res) => {
  try {
    const { resident } = req ?? {};
    const { residentId } = await addResidentToDb(resident);
    res
      .status(201)
      .json({ success: `New resident ${resident.name} with id ${residentId} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getResidents = async (req, res) => {
  try {
    const residents = await getResidentsFromDb();
    console.log(residents);
    res.status(200).json(residents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getCountResidentsWithNoMedicalRecords = async (req, res) => {
  try {
    const residentsCount = await getCountResidentsWithNoMedicalRecordsFromDb();
    console.log(residentsCount);
    res.status(200).json(residentsCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getResidentsWithNoMedicalRecords = async (req, res) => {
  try {
    const residents = await getResidentsWithNoMedicalRecordsFromDb();
    console.log(residents);
    res.status(200).json(residents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getSpecificResident = async (req, res) => {
  try {
    const { residentId } = req.params;
    console.log(`FROM getSpecificResident controller`);
    console.log(residentId);
    const resident = await getSpecificResidentFromDb(residentId);
    console.log(resident);
    res.status(200).json(resident);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  addResident,
  getResidents,
  getCountResidentsWithNoMedicalRecords,
  getResidentsWithNoMedicalRecords,
  getSpecificResident,
};
