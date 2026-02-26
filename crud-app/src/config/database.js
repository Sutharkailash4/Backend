const mongoose = require("mongoose");

const connectToDatabase = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected To Database");
    }).catch((error)=>{
        console.log("Failed To Connect",error);
    })
}

module.exports = connectToDatabase;