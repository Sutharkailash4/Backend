const express = require("express");

const app = express();

app.use(express.json());

const Notes = [];

app.post('/notes', (req, res) => {
    Notes.push(req.body);
    console.log(Notes.length);
    res.send('Create Some Notes');
})

app.get('/notes',(req,res)=>{
    res.send(Notes);    
})

app.listen(3000, () => {
    console.log('Server is running successfully...');
})