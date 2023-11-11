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

app.use("/users/requests", require("./routes/staff/admin/updateRequest.js"));
// app.use("/admin/approve");
// app.use("/admin/refuse");

app.listen(PORT, console.log(`App Listening to port ${PORT}`));
