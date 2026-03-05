require("dotenv").config();
const port  = 3000;
const app = require("./src/app");
const database = require("./src/config/database");

database();

app.listen(port,()=>{
    console.log("Server is running on port 3000");
})