const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 4500;

// Logger
app.use(morgan("tiny"));

// built-in middlware to handle form data
app.use(express.urlencoded({ extended: false }));

// built-in middlware for json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(
  "/users/register",
  require("./middlewares/processUserData.js"),
  require("./routes/users/register.js")
);

// handle user requests
app.use("/users/requests", require("./routes/staff/admin/updateRequest.js"));

// add new resident
app.use(
  "/residents",
  require("./middlewares/processResidentData.js"),
  require("./routes/residents.js")
);
// add new room
app.use("/room", require("./routes/rooms.js"));
// add new shift
app.use("/shift", require("./routes/shifts.js"));
// post feedback
app.use("/feedback", require("./routes/feedback.js"));
// add new role
app.use("/roles", require("./routes/roles.js"));

app.listen(PORT, console.log(`App Listening to port ${PORT}`));
