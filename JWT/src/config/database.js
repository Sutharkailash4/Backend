const mongoose = require("mongoose");

const ConnectedToDatabase = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected To Database Successfully");
    }).catch(()=>{
        console.log("Failed To Connect");
    })
}

module.exports = ConnectedToDatabase;;