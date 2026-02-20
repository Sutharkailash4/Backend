const express = require("express");
const app = express(); // server instance create 
app.get('/', function (req, res) {
    res.send("Home Page");
});
app.get('/skills', function (req, res) {
    res.send('Skills Page');
})
app.get('/about', function (req, res) {
    res.send('About Page');
})

app.listen(4488);  // server start         