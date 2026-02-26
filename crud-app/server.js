require("dotenv").config();
const app = require("./src/app");
const Database = require("./src/config/database");

const port = 3000;

Database();

app.listen(port,()=>{
    console.log("Server is running on port 3000");
})