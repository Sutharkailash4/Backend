const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const userAuth = express.Router();
cont 

userAuth.post("/register",async(req,res)=>{
    try{
        const data = req.body;
        if(!data.name || data.name.trim()==="") return res.send("Name is Required");
        else if(!data.email || data.email.trim()==="") return res.send("Email is Required");
        else if(!data.password || data.password.trim()==="") return res.send("Password is Required");
        else {
            const {name,password,email} = req.body;
            const find = await userModel.findOne({email});
            if(!find){
           const data = await userModel.create({
                name : name,
                email : email,
                password : password
            })
            const token = jwt.sign(
                {
                    id : data._id,
                    email : email
                },
                process.env.JWT_SECRET
            )
            res.status(201).json({
                message : "User Created Successfully",
                data,
                token
            })} else {
                res.status(409).json({
                    message : "User With this email already exist"
                })
            }
        }
    }  catch(error){
        res.status(400).json({
            message : "Something Went Wrong",
            error
        })
    } 
})

userAuth.get("/register",async(req,res)=>{
    try{
        const count = await userModel.countDocuments();
        if(count){
            const allUser = await userModel.find();
            res.status(200).json({
                message : "User Fetch Succesfully",
                allUser
            })
        } else {
            res.send("User Not Added");
        }
    }catch(error){
        res.status(400).json({
            message : "Something Went Wrong",
            error
        })
    }
})

userAuth.patch("/register/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const {name,password,email} = req.body;
        await userModel.findByIdAndUpdate(id,{name,password,email})
        res.status(200).json({
            message : "User Updated Successfully",
        })
    }catch(error){
        res.status(400).json({
            message : "Something Went Wrong",
            error
        })
    }
})

userAuth.delete("/register/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        await userModel.findByIdAndDelete(id)
        res.status(201).json({
            message : "User Deleted Successfully",
        })
    }catch(error){
        res.status(400).json({
            message : "Something Went Wrong",
            error
        })
    }
})

module.exports = userAuth;