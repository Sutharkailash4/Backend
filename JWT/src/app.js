const express = require("express");
const app = express();
const userAuth = require("./routes/user.route");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",userAuth);
module.exports = app;