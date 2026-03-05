const express = require("express");
const userAuth = require("./routes/userRouter");
const app  = express();
app.use(express.json());
app.use("/api/auth",userAuth);
module.exports = app;