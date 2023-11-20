const { addShiftToDb } = require("../services/shifts/addShiftToDb.js");

const addShift = async (req, res) => {
  try {
    const { startTime, endTime } = req.body;
    // check if the room is already in use [Future work]
    const newShift = await addShiftToDb(startTime, endTime);
    console.log(`new shift ${newShift}`);
    return res.status(201).json({ success: `shift ${newShift} created!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = addShift;
