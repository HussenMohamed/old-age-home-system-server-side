const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const credentials = require("./middlewares/credentials.js");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cron = require("node-cron");

const PORT = process.env.PORT || 4500;

// Logger
app.use(morgan("tiny"));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middlware to handle form data
app.use(express.urlencoded({ extended: true }));

// built-in middlware for json
app.use(express.json());

// middlware for cookies
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(
  "/users/register",
  require("./middlewares/processUserData.js"),
  require("./routes/users/register.js")
);
app.use("/users/login", require("./routes/login.js"));
app.use("/users/refresh", require("./routes/refresh.js"));
app.use("/users/logout", require("./routes/logout.js"));

// any route after this line will use the verifyJWT middleware
// app.use(require("../../../middlewares/verifyJWT.js"));

// handle user requests
app.use("/users/requests", require("./routes/staff/admin/updateRequest.js"));

// add new resident
app.use(
  "/residents",
  require("./middlewares/processResidentData.js"),
  require("./routes/residents.js")
);
// add new Staff Member
app.use("/staff", require("./routes/staff/staffMembers.js"));
// add new room
app.use("/room", require("./routes/rooms.js"));
// add new shift
app.use("/shift", require("./routes/shifts.js"));
// Tasks
app.use("/tasks", require("./routes/tasks/tasks.js"));
// Family Members
app.use("/familyMembers", require("./routes/familyMembers.js"));
// post feedback
app.use("/feedback", require("./routes/feedback.js"));
// add new role
app.use("/roles", require("./routes/roles.js"));
// medical records
app.use("/record", require("./routes/medicalRecords.js"));
// add new medication schedule
app.use("/medication", require("./routes/medSchedule.js"));
// add new Product
app.use("/product", require("./routes/products.js"));
// add new purchase request
app.use("/purchaseRequest", require("./routes/purchase.js"));
// add new supplier
app.use("/supplier", require("./routes/supplier.js"));

// medications to tasks schedule
// Define the cron job to run every minute
// cron.schedule("*/10 * * * * *", require("./cronSchedules/medicationsToTasks.js"));
// Define the cron job to run at 23:59 every day
// cron.schedule("59 23 * * *", require("./cronSchedules/clearIsTaskCreated.js"));

app.listen(PORT, console.log(`App Listening to port ${PORT}`));
