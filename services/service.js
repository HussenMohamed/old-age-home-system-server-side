const { checkDuplicate } = require("./users/duplicateUsers.js");
const { createUserRequest } = require("./users/createUser.js");
const { updateRequestState } = require("./staff/admin/updateReqState.js");
const { acceptUser } = require("./staff/admin/acceptUser.js");

module.exports = { checkDuplicate, createUserRequest, updateRequestState, acceptUser };
