const express = require("express");

const app = express();

app.use(express.json());

const Notes = [];

app.get('/',(req,res)=>{
    req.send("You server is start now");
})

app.post('/notes',(req,res)=>{
    let request = req.body;
    Notes.push(request);
    Count = Count+1;
    res.send("Enter Your Notes");
})

app.get('/notes',(req,res)=>{
    res.send(Notes);
})

app.get('/count',(req,res)=>{
    res.send(Notes.length);
})

app.listen(3000,()=>{
    console.log("Server is running successfully");
})