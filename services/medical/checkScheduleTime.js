const { pool } = require("../../model/db.config");

const checkScheduleTime = async () => {
  try {
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    // Get the current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const currentDay = new Date().getDay();
    const currentDayName = daysOfWeek[currentDay];

    // Get the current time in HH:MM format
    const currentTime = new Date();
    const currentTimeText = currentTime.toLocaleTimeString("en-US", { hour12: false });
    const nextHour = new Date(currentTime.getTime() + 60 * 60 * 1000); // Add 60 minutes
    // Execute the SQL query to insert a get family members from the database
    console.log("The start of checkScheduleTime function");

    const [scheduletimes] = await pool.execute(
      `SELECT * FROM scheduletime WHERE DayOfTheWeek = ? AND Time BETWEEN ? AND ADDTIME(?, '01:00:00') AND isTaskCreated IS NOT true;`,
      [currentDayName, currentTime, currentTime]
    );
    console.log(`after first query, scheduletimes`);
    console.log(scheduletimes);
    if (scheduletimes.length === 0) {
      console.log(`scheduletimes.length = ${scheduletimes.length} | so there are no result`);
      // There are no rows returned from the query
      return;
    }
    console.log("The first query returned a result");
    scheduletimes.map(async (scheduletime, index) => {
      // Fetch the ResponsibleStaffID based on ResidentID
      const [staffRow] = await pool.execute(
        `SELECT staff.StaffID, staff.Name FROM resident, staff, medicalrecord,scheduletime, medications WHERE scheduletime.ScheduleTimeID = ? AND scheduletime.MedicationID = medications.MedicationID AND medications.MedicalRecordID = medicalrecord.MedicalRecordID AND medicalrecord.ResidentID = resident.ResidentID AND resident.ResponsibleStaffID = staff.StaffID`,
        [scheduletime.ScheduleTimeID]
      );
      console.log(`iteration ${index} of the scheduletimes => staffRow = `);
      console.log(staffRow);
      if (staffRow.length > 0) {
        const ResponsibleStaffID = staffRow[0].StaffID;

        // add a task
        await pool.execute(
          `INSERT INTO tasks (TaskTitle, TaskDescription, AssigneeID, AssignDate, DueDate) VALUES (?, ?, ?, NOW(), NOW())`,
          [
            `Reminder for medication ${scheduletime.MedicationID}`,
            `The reminder Details for medication ${scheduletime.MedicationID}`,
            ResponsibleStaffID, // Use the ResponsibleStaffID as AssigneeID
          ]
        );
        // set the isTaskCreated flag of the medication schedule
        await pool.execute(`UPDATE scheduletime SET isTaskCreated = 1 WHERE ScheduleTimeID = ?`, [
          scheduletime.ScheduleTimeID,
        ]);
      } else {
        console.log(`Responsible staff not found for ResidentID: ${scheduletime.ResidentID}`);
      }
    });
    console.log(`The second query is done`);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { checkScheduleTime };
