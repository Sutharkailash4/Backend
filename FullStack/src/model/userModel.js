const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    city: String,
    isActive : Boolean
});

const userModel = mongoose.model("user-data",userSchema);

module.exports = userModel;