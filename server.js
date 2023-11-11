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
app.use("/register", require("./middlewares/processUserData.js"), require("./routes/register.js"));

app.listen(PORT, console.log(`App Listening to port ${PORT}`));
