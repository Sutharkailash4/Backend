const app = require("./src/app.js");
const Port = 3000;

app.get('/', (req, res) => {
    res.send("Welcome to the server");
})

const UsersData = [];

app.post('/users', (req, res) => {
    let data = req.body;
    UsersData.push(data);
    res.send("User data added.");
})

app.get('/users', (req, res) => {
    if (UsersData.length === 0) {
        res.send("No users");
    } else {
        res.send(UsersData);
    }
})

app.patch('/users/:index', (req, res) => {
    let idx = Number(req.params.index);
    UsersData[idx].name = req.body.name;
    res.send("Update successfully");
})

app.delete('/users/:index', (req, res) => {
    let idx = Number(req.params.index);
    if (idx < 0 || idx > UsersData.length) {
        res.send("Wrong Index");
    } else {
        UsersData.splice(idx, 1);
        res.send("User delete successfully");
    }
})

app.listen(Port, () => {
    console.log("Server is start at port 3000");
})