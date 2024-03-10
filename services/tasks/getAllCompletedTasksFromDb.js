const { pool } = require("../../model/db.config");

const getAllCompletedTasksFromDb = async () => {
  // Options for formatting the date and time
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 24-hour format
  };
  try {
    // Execute the SQL query to insert a get roles from the database
    const [result] = await pool.execute(
      `SELECT t.TaskTitle, t.TaskDescription, t.CompletionTime, a.Name AS AssigneeName, b.Name AS AssignerName, t.AssignDate, t.DueDate, r.RoleName AS AssigneeRoleName FROM tasks t JOIN staff a ON t.AssigneeID = a.StaffID JOIN staff b ON t.AssignerID = b.StaffID JOIN roles r ON a.RoleID = r.RoleID WHERE t.isCompleted = 1;`
    );
    // Convert ISO date strings to readable format
    const tasks = result.map((task) => {
      // Convert BirthDate to readable format
      task.AssignDate = new Date(task.AssignDate).toLocaleDateString(undefined, options);
      // Convert JoiningDate to readable format
      task.DueDate = new Date(task.DueDate).toLocaleDateString(undefined, options);
      // Convert CompletionTime to readable format
      task.CompletionTime = new Date(task.CompletionTime).toLocaleDateString(undefined, options);

      return task;
    });
    console.log(`From roles query`);
    return tasks;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllCompletedTasksFromDb };
