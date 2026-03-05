require("dotenv").config();
const app = require("./src/app");
const database = require("./src/config/database");
const port = 3000;

database();

app.listen(port,()=>{
    console.log("Server is running on port 3000");
})