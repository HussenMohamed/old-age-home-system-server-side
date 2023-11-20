const { addResidentToDb } = require("../services/residents/addNewResident.js");
const addResident = async (req, res) => {
  try {
    const { resident } = req;
    const { residentId } = await addResidentToDb(resident);
    res
      .status(201)
      .json({ success: `New resident ${resident.name} with id ${residentId} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = addResident;
