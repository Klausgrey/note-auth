const express = require("express");
const authRoute = require("./routes/authRoute");
const noteRoute = require("./routes/noteRoute");
const app = express();
app.use(express.json());

app.use("/auth", authRoute);
app.use("/notes", noteRoute);

module.exports = app;
