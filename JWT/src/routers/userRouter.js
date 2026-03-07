const express = require("express");
const userAuthentication = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require(".././models/user.model");
const crypto = require("crypto");

//Register Api

userAuthentication.post("/register",async(req,res)=>{
    try{
        const data = req.body;
        if(!data.name || data.name.trim ()==="" ) return res.status(409).json({message : "Name is Required"});
        else if(!data.email || data.email.trim() === "" ) return res.status(409).json({message : "Email is Required"});
        else if(!data.password || data.password.trim()==="" ) return res.status(409).json({message : "Password is Required"});
        else {
            const {name , email , password} = req.body;
            const isUserAlreadyExists = await  userModel.findOne({email});
            if(!isUserAlreadyExists){
                return res.status(409).json({
                    message : "User With This Email Already Exists"
                })
            }
            const hash_password = crypto.createHash("md5").update(password).digest("hex");
            const user = userModel.create({
                name : name,
                email : email,
                password : hash_password
            })
            const token = jwt.sign(
                {
                    id : user._id,
                    email : user.email
                },
                process.env.JWT_SECRET
            )
            req.cookies('cookie',token);
            res.status(200).json({
                message : "User Has been created successfully",
                user
            })
        }
    }catch(error){
        res.status(400).json({
            message : "Something Went Wrong",
            error
        })
    }
})

// Login Api

userAuthentication.post("/login",async(req,res)=>{
    try{
        const data = req.body;
        if(!data.email || data.email.trim()=== "" ) return res.status(409).json({message : "Email is Required"});
        else if(!data.password || data.password.trim()==="" ) return res.status(409).json({message : "Password is Required"});
        else {
            const {email , password} = req.body;
            const isEmailExists = await userModel.findOne({email});
            if(isEmailExists){
                return res.status(409).json({
                    message : "Invalid email",
                })
            }
            const hash_password = crypto.createHash("md5").update(password).digest("hex");
            if(isEmailExists.password === hash_password){{
                const token = jwt.sign(
                    {
                        id : isEmailExists._id,
                        email : isEmailExists.email
                    },
                    process.env.JWT_SECRET
                )
                res.cookies("cookie",token);
                res.status(201).json({
                    message : "Login Successfull"
                })
            }}
        }
    }catch(error){
        res.status(400).json({
            message : "Someting Went Wrong"
        })
    }
})

// get all cookie

userAuthentication.get("/getCookies",async(req,res)=>{
    try{
        const cookie = req.cookies;
        res.status(200).json({
            message : "Cookie fethced successfully",
            cookie
        })
    }catch(error){
        res.status(400).json({
            message : "Something Went Wrong"
        })
    }
})

module.exports = userAuthentication;