const { checkScheduleTime } = require("../services/medical/checkScheduleTime.js");
const medicationsToTasks = async () => {
  await checkScheduleTime();
};

module.exports = medicationsToTasks;
