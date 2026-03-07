const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userAuth  = require("./routers/userRouter");
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",userAuth);
module.exports = app;