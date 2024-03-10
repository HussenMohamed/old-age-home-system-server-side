const express = require("express");
const router = express.Router();
router.post("/", require("../../controllers/tasksController.js").addTask);
router.get("/uncompleted", require("../../controllers/tasksController.js").getUncompletedTasks);
router.get(
  "/uncompleted/:assigneeId",
  require("../../controllers/tasksController.js").getSpecificUncompletedTasks
);
router.patch("/completeTask/:taskId", require("../../controllers/tasksController.js").completeTask);
router.get("/completed", require("../../controllers/tasksController.js").getAllCompletedTasks);
router.get(
  "/completed/:assigneeId",
  require("../../controllers/tasksController.js").getSpecificCompletedTasks
);
module.exports = router;
