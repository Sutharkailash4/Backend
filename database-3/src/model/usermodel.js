const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String
});

const userModel = mongoose.model("userData", newSchema);

module.exports = userModel;