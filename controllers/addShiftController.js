const { addShiftToDb } = require("../services/shifts/addShiftToDb.js");
const { getShiftsFromDb } = require("../services/shifts/getShiftsFromDb.js");

const addShift = async (req, res) => {
  try {
    const { startTime, endTime } = req.body;
    const newShift = await addShiftToDb(startTime, endTime);
    console.log(`new shift ${newShift}`);
    return res.status(201).json({ success: `shift ${newShift} created!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getShifts = async (req, res) => {
  try {
    const roleNames = await getShiftsFromDb();
    console.log(roleNames);
    res.status(200).json(roleNames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addShift, getShifts };
