const { getRoleNamesFromDb } = require("../services/roles/getRole.js");
const { addRoleToDb } = require("../services/roles/addNewRole.js");
const { getStaffByRolesFromDb } = require("../services/roles/getStaffByRolesFromDb.js");

const addRole = async (req, res) => {
  try {
    const { roleName, roleDescription } = req.body;
    // check if the role is already in use [Future work]
    const newRole = await addRoleToDb(roleName, roleDescription);
    return res.status(201).json({ success: `Role ${newRole}: ${roleName}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getRoleNames = async (req, res) => {
  try {
    const roleNames = await getRoleNamesFromDb();
    console.log(roleNames);
    res.status(200).json(roleNames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getStaffGroupedByRoles = async (req, res) => {
  try {
    const staffByRoles = await getStaffByRolesFromDb();
    console.log(staffByRoles);
    res.status(200).json(staffByRoles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
module.exports = { addRole, getRoleNames, getStaffGroupedByRoles };
