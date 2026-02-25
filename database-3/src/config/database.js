const mongoose = require("mongoose");

const connectToDatabase = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected To Database Succesfully");
    }).catch(()=>{
        console.log("Failed TO Connect");
    })
}

module.exports = connectToDatabase;