const express = require("express");
const app = express(); // create server instance
app.use(express.json());
module.exports = app;