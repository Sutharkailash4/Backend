const express = require("express");
const userAuthentication = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require(".././models/user.model");

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
        message : "Something Went Wrong",
        error
       })
    }
})

userAuthentication.get("/users",async(req,res)=>{
    try{
        const count = await userModel.find();
        if(count.length === 0){
         return res.status(300).json({
                message : "User Not Added"
            })
        }
        res.status(200).json({
            message : "User Fetch Successfully",
            count
        })
    }catch(error){
         res.status(400).json({
            message : "Something Went Wrong",
            error
         })
    }
})

userAuthentication.patch("/users/:id",async(req,res)=>{
    try{
       const id = req.params.id;
       const {name,password,email} = req.body;
       await userModel.findByIdAndUpdate(id,{name,email,password})
       const isUserExists =await userModel.findOne({email});
       if(!!isUserExists){
        res.status(400).json({
            message : "User Already Exists with this email"
        })
       } else {
       res.status(201).json({
        message : "User Updated Successfully"
       })
    }
    }catch(error){
       res.status(400).json({
        message : "Something Went Wrong",
        error
       })
    }
})

userAuthentication.delete("/users/:id",async(req,res)=>{
    try{
      const id = req.params.id;
      const isUserExits = await userModel.findById({id})
      if(!isUserExits){
        return res.status(400).json({
            message : "User Not Exists With This ID"
        })
    }
    await userModel.findByIdAndDelete(id);
    res.status(201).json({
        message : "User Deleted Successfully"
    })
    }catch(error){
        res.status(400).json({
            message : "Something Went Wrong"
        })
    }
})

userAuthentication.post("/getCookie",async(req,res)=>{
    try{
      res.status(200).json({
        message : "Cookie Fethced Successfully",
        value : req.cookies
      })
    }catch(error){
      res.status(400).json({
        message : "Something Went Wrong"
      })
    }
})

userAuthentication.post("/login",async(req,res)=>{
    try{
      const {email,password} = req.body;
      const isEmailExits = await userModel.findOne({email});
      if(!isEmailExits){
        return res.status(409).json({
            message : "Email Address Does Not Exits"
        })
      }
      const isPasswordtrue =  await userModel.findOne({password});
      if(!isPasswordtrue){
        return res.status(409).json({
            message : "Wrong Password"
        })
      }
      res.status(201).json({
        message : "Login Successfull"
      })
    }catch(error){
       res.status(400).json({
        message : "Something Went Wrong",
        error
       })
    }
})

module.exports = userAuthentication;