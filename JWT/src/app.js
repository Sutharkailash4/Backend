const express = require("express");
const app = express();
const userAuth  = require("./routers/userRouter");
app.use(express.json());
app.user("/api/auth",userAuth);
module.exports = app;