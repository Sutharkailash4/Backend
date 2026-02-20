import express from 'express';

const app = express(); // create server innstance

app.get('/',(req,res)=>{
    res.send('this is home page');
});
app.get('/about',(req,res)=>{
    res.send('this is about page');
});
app.get('/contact',(req,res)=>{
    res.send('this is contact page');
});
app.get('/skills',(req,res)=>{
    res.send('this is skills page');
})

app.listen(3000,()=>{  // run server
    console.log('server is running successfully....');
});