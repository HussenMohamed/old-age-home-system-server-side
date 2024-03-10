// const { getRoleNamesFromDb } = require("../services/roles/getRole.js");
const { addStafftoDb } = require("../services/staff/addStafftoDb.js");
const { getStaffFromDb } = require("../services/staff/getStaffFromDb.js");

const addStaff = async (req, res) => {
  try {
    const { username, phoneNumber, email, role, shift } = req.body;
    // check if the role is already in use [Future work]
    // const roleId = await getRoleIdByRoleName(role);

    const newStaff = await addStafftoDb(username, phoneNumber, email, role, shift);
    return res
      .status(201)
      .json({ success: `Added ${username} As a Staff Member with id ${newStaff}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getStaffMembers = async (req, res) => {
  try {
    const roleNames = await getStaffFromDb();
    console.log(roleNames);
    res.status(200).json(roleNames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
module.exports = { addStaff, getStaffMembers };
