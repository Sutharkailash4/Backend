const mongoose = require("mongoose");

const userSchema = new  mongoose.Schema({
    name : {type : String , require : true},
    email : {type : String , require : true , unique : true},
    password : {type : String , reqiure : true , unique : true}
});

const userModel = mongoose.model("cookie",userSchema);

module.exports = userModel;