const { clearIsTaskCreatedInDb } = require("../services/tasks/clearIsTaskCreatedInDb.js"); //services\tasks\clearIsTaskCreatedInDb.js
const clearIsTaskCreated = async () => {
  await clearIsTaskCreatedInDb();
};

module.exports = clearIsTaskCreated;
