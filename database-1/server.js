const app = require("./src/app");
const mongoose = require("mongoose");
let port = 3000;

const connectToDb = () => {
    mongoose.connect("mongodb://kailash:SiW24DfAoAzL8qG0@ac-tqmb3mc-shard-00-00.3xlbvdq.mongodb.net:27017,ac-tqmb3mc-shard-00-01.3xlbvdq.mongodb.net:27017,ac-tqmb3mc-shard-00-02.3xlbvdq.mongodb.net:27017/?replicaSet=atlas-2i08b7-shard-0&ssl=true&authSource=admin")
    .then(()=>{
        console.log("Database is Connected");
    }).cathc((error)=>{
        console.log("Not Connected to database",error);
    })
}

connectToDb();

app.listen(port, () => {
    console.log("Server is runnig on port 3000");
})