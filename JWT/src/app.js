const express = require("express");
const userAuth = require("./routes/userRouter");
const cookieParser = require("cookie-parser");
const app  = express();
app.use(express.json());
app.use("/api/auth",userAuth);
module.exports = app;