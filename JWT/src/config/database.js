const mongoose = require("mongoose");

const ConectedToDatabase = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to database successfully");
    }).catch(()=>{
        console.log("Failed to connect");
    })
}

module.exports = ConectedToDatabase;