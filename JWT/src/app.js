const express = require("express");
const app = express();
const userAuth = require("./routes/userRouter");
app.use("api/authentication",userAuth);
app.use(express.json());
module.exports = app;