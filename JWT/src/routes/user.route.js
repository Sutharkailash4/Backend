const express = require("express");
const userAuthentication = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("./models/user.model");

userAuthentication.post("/register",async(req,res)=>{
    try{
       const data = req.body;
       if(!data.name || data.name.trim()==="") return res.status(400).json({message : "Name is Required" });
       else if(!data.email || data.email.trim()==="") return res.status(400).json({message : "Email is Required"});
       else if(!data.password || data.password.trim()==="") return res.status(400).json({message : "Password is Required"});
       else {
        const {name, email, password} = req.body;
        const isUserEmailExists = await userModel.findOne({email});
        if(!!isUserEmailExists){
            return res.status(400).json({
                message : "With this Email User Already Exists"
            })   
        }
        const userData = await userModel.create({
            name : name,
            email : email,
            password : password
        });
        const token = jwt.sign(
            {
            id : userData._id,
            email : userData.email
        },
        process.env.JWT_SECRET
    )
    res.cookie("UserCookie",token)
    res.send("Cookie Created Successfully and set");
       } 
    }catch(error){
       res.status(400).json({
        message : "Something Went Wrong"
       })
    }
})

userrAuthentication.get("/users",async(req,res)=>{
    try{
        const count = await userModel.find();
        if(count===0){
         return res.staus(300).json({
                message : "User Not Added"
            })
        }
        res.status(201).json({
            message : "User Fetch Successfully",
            count
        })
    }catch(error){
         res.status(400).json({
            message : "Something Went Wrong"
         })
    }
})

userAuthentication.patch("/users/:id",async(req,res)=>{
    try{
       const id = req.params.id;
       const {name,password,email} = req.body;

    }catch(error){

    }
})

module.exports = userAuthentication;