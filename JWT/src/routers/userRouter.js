const express = require("express");
const userAuthentication = express.Router();
const jwt = require("jsonwebtoken");

//Register Api

userAuthentication.post("/register",async(req,res)=>{
    try{
        const data = req.body;
        if(!data.name || data.anem.trim ()==="" ) return res.status(409).json({message : "Name is Required"});
        else if(!data.email || data.email.trim() === "" ) return res.status(409).json({message : "Email is Required"});
        else if(!data.password || data.password.trim()==="" ) return res.status(409).json({message : "Password is Required"});
        else {
            
        }
    }catch(error){

    }
})

module.exports = userAuthentication;