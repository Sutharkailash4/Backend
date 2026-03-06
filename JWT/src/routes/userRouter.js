const express = require("express");
const userAuthentication = express.Router();
const userModel = require("userModel");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { strict } = require("assert");

// Register

userAuthentication.post("/register",async (req,res)=>{
    try{
        const data = req.body;
        if(!data.name || data.name.trim()==="") return res.status(409).json({message : "Name is Required"});
        else if(!data.email || data.email.trim()==="") return res.status(409).json({message : "Email is Required"});
        else if(!data.password || data.password.trim()==="") return res.status(409).json({message : "Password is Required"});
        else {
            const {name,email,password} = req.body;
            const isEmailAlreadyExists = await userModel.findOne({email});
            if(!!isEmailAlreadyExists){
                return res.status(409).json({
                    message : "User Already Exist With This Email."
                })
            }
            const hash_password = crypto.createHash("md5").update(password).digest("hex");
            const user = await userModel.create({
                name : name,
                email : email,
                password :hash_password
            })
            const token = jwt.sign(
                {
                    id : user._id,
                    email : user.email
                },
                process.env.JWT_SECRET
            )
            res.cookie("token",token,{
                httpOnly : true,
                secure : true,
                sameSite : strict,
            });
        }
   }catch(error){
        res.status(400).json({
            message : "Something Went Wrong"
        })
    }
})

// Login 

userAuthentication.post("/login",async(req,res)=>{
    try{
        const data = req.body;
        if(!data.email || data.email.trim()==="") return res.status(409).json({message : "Email is Required"});
        else if(!data.password || data.password.trim()==="") return res.status(409).json({messgae : "Password is Required"});
        else {
            const {email,password} = req.body;
            const isEmailIsValid = await userModel.findOne({email});
            if(!isEmailIsValid){
                return res.status(409).json({
                    message : "Email Does Not Exits."
                })
            }
            if(isEmailIsValid.password === password){
                res.status(200).json({
                    message : "Login Successfull"
                })
            } else {
                res.status(409).json({
                    message : "Invalid Password"
                })
            }
        }
    }catch(error){
        res.status(400).json({
            message : "Something Went Wrong"
        })      
    }
})

// Get Cookies

userAuthentication.get("/getCookie",async(req,res)=>{
    try{
        res.status(200).json({
            message : "All Cookie Fetched",
            cookie : req.cookies
        })
    }catch(error){
        res.status(400).json({
            message : "Something Went Wrong"
        })
    }
})

module.exports = userAuthentication;