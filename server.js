const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 4500;

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, console.log(`App Listening to port ${PORT}`));
