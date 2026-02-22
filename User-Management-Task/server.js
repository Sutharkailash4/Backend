const app = require("./src/app.js");

let port = 3000;

const UsersData = [];

app.get('/', (req, res) => {
    res.send("Welcome to server");
})

app.post('/user', (req, res) => {
    let response = req.body;

    if (!response.id || response.id.trim() === "")
        res.send("Id is Required");

    else if (!response.name || response.name.trim() === "")
        res.send("Name is Required");

    else if (!response.email || response.email.trim() === "")
        res.send("Email is Required");

    else if (isNaN(Number(response.age)) || Number(response.age) <= 0)
         res.send("Age is Required");

    else if (typeof response.isActive !== "boolean")
        res.send("Active or not is Required");

    else {
        let flag = true;
        for (let i = 0; i < UsersData.length; i++) {
            if (UsersData[i].email === response.email) {
                res.send("Please Enter Unique Email");
                flag = false;
                break;
            }
        }
        if (flag) {
            UsersData.push(response);
            res.send("User Added Successfully");
        }
    }
})

app.get('/allUser', (req, res) => {
    if (UsersData.length === 0) res.send("No User Found");
    else res.send(UsersData);
})

app.get('/user/:index', (req, res) => {
    let idx = Number(req.params.index);

    if (isNaN(idx) || idx < 0 || idx >= UsersData.length)
        res.send("Wrong Index");
    else
        res.send(UsersData[idx]);
})

app.put('/user/:index', (req, res) => {
    let idx = Number(req.params.index);

    if (isNaN(idx) || idx < 0 || idx >= UsersData.length)
        res.send("Wrong Index");
    else {
        let { id, name, email, age, isActive } = req.body;

        let flag = true;
        for (let i = 0; i < UsersData.length; i++) {
            if (UsersData[i].email === email && i !== idx) {
                res.send("Please Enter Unique Email");
                flag = false;
                break;
            }
        }

        if (flag) {
            if (id !== undefined) UsersData[idx].id = id;
            if (name !== undefined) UsersData[idx].name = name;
            if (email !== undefined) UsersData[idx].email = email;
            if (age !== undefined) UsersData[idx].age = age;
            if (isActive !== undefined) UsersData[idx].isActive = isActive;

            res.send("User Data Updated");
        }
    }
})

app.delete('/user/:index', (req, res) => {
    let idx = Number(req.params.index);

    if (isNaN(idx) || idx < 0 || idx >= UsersData.length)
        res.send("Wrong Index");
    else {
        UsersData.splice(idx, 1);
        res.send("User Deleted Successfully");
    }
})

app.listen(port, () => {
    console.log("Server is start at port 3000");
})