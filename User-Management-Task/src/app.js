const express = require("express");
const app = express(); // start server instance
app.use(express.json());
module.exports = app;