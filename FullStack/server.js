require("dotenv").config();
const app = require("./src/app");
const Database = require("./src/config/database");
const userModel = require("./src/model/userModel");
const cors = require("cors");

app.use(cors());

const port = 3000;

Database();

app.post('/api/users', async (req, res) => {
    const { name, email, age, city, isActive } = req.body;
    try {
        await userModel.create({
            name,
            email,
            age,
            city,
            isActive
        })
        res.status(201).json({
            message: "User Created Successfully"
        })
    } catch (error) {
        res.send("Failed To Create", error);
    }
})

app.get('/api/users', async (req, res) => {
    try {
        const userData = await userModel.find();
        res.status(200).json({
            message: "User Fetched Sucessfully",
            userData
        })
    } catch (error) {
        res.send("Failed To Fetch", error);
    }
})

app.patch('/api/users/:id', async (req, res) => {
    try {
        const { name, email } = req.body;
        const id = req.params.id;
        await userModel.findByIdAndUpdate(id, { name, email })
        res.status(200).json({
            message: "User Updated Successfully"
        })
    } catch (error) {
        res.send("Failed To Update", error);
    }
})

app.delete('/api/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await userModel.findByIdAndDelete(id)
        res.status(201).json({
            message: "User Deleted Successfully"
        })
    } catch (error) {
        res.send("Failed To Delete", error);
    }
})

app.listen(port, () => {
    console.log("Server is running on port 3000");
})