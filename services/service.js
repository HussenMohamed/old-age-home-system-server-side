const { checkDuplicate } = require("./users/duplicateUsers.js");
const { createUserRequest } = require("./users/createUser.js");
const { updateRequestState } = require("./staff/admin/updateReqState.js");

module.exports = { checkDuplicate, createUserRequest, updateRequestState };
