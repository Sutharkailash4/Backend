const express = require("express");
const app = express();
const userAuth = require("./routes/userRouter");
const userModel = require("./models/user.model");
const cookieParser = require("cookie-parser");
app.use("/api/authentication",userAuth);
app.use(express.json());
app.use(cookieParser());

app.get("/users",async(req,res){
    try{
        const count = await userModel.find();
        if(count.length === 0){
            return res.status(400).json({
                message : "User Not Added"
            })
        }
        res.status(200).json({
            message : "All User Fetch Successfully",
            count;
        })
    }catch(error){
        res.status(400).json({
            message : "Something Went Wrong"
        })
    }
})

module.exports = app;