require("dotenv").config();
const port  = 3000;
const app = require("./src/app");
const database = require("./src/config/database");

app.listen(port,()=>{
    console.log("Server is running on ort 3000");
})