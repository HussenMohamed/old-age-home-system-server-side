// const { addMedicationToDb } = require("../services/medical/addMedicationToDb.js");
const { addTaskToDb } = require("../services/tasks/addTaskToDb.js");
const { getUncompletedTasksFromDb } = require("../services/tasks/getUncompletedTasksFromDb.js");
const { completeTaskInDb } = require("../services/tasks/completeTask.js");
const { getAllCompletedTasksFromDb } = require("../services/tasks/getAllCompletedTasksFromDb.js");
const {
  getSpecificCompletedTasksFromDb,
} = require("../services/tasks/getSpecificCompletedTasksFromDb.js");
const {
  getSpecificUncompletedTasksFromDb,
} = require("../services/tasks/getSpecificUncompletedTasksFromDb.js");
const addTask = async (req, res) => {
  try {
    const { taskTitle, taskDescription, assigneeId, assignerId, assignDate, dueDate } = req.body;
    const newMedicationId = await addTaskToDb(
      taskTitle,
      taskDescription,
      assigneeId,
      assignerId,
      assignDate,
      dueDate
    );
    return res.status(201).json({ success: `New Task assigned to Staff Member id:${assignerId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getUncompletedTasks = async (req, res) => {
  try {
    const completedTasks = await getUncompletedTasksFromDb();
    console.log(completedTasks);
    res.status(200).json(completedTasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getSpecificUncompletedTasks = async (req, res) => {
  try {
    const { assigneeId } = req.params;
    const unCompletedTasks = await getSpecificUncompletedTasksFromDb(assigneeId);
    console.log(unCompletedTasks);
    res.status(200).json(unCompletedTasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    // const { completionTime } = req.body;
    const completedTask = await completeTaskInDb(taskId);
    console.log(completedTask);
    res.status(201).json({ success: `Task with id ${taskId} is completed` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllCompletedTasks = async (req, res) => {
  try {
    const completedTasks = await getAllCompletedTasksFromDb();
    console.log(completedTasks);
    res.status(200).json(completedTasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getSpecificCompletedTasks = async (req, res) => {
  try {
    const { assigneeId } = req.params;
    const completedTasks = await getSpecificCompletedTasksFromDb(assigneeId);
    console.log(completedTasks);
    res.status(200).json(completedTasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addTask,
  getUncompletedTasks,
  getSpecificUncompletedTasks,
  completeTask,
  getAllCompletedTasks,
  getSpecificCompletedTasks,
};
