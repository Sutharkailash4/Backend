const express = require("express");
const app = express();
const cors = require("cors");
const userModel = require("./model/userModel");
app.use(express.json());
app.use(cors());

app.post("/api/users", async (req, res) => {
    const data = req.body;
    if (!data.name || data.name.trim() === "") return res.status(300).json({ message: "Name is Required" })
    else if (!data.email || data.email.trim() === "") return res.status(300).json({ message: "Email is requires" })
    else if (!data.age || Number.isNaN(data.age) || !data.age) return res.status(300).json({ message: "Age is Reaquired" })
    else if (!data.image || data.image.trim() === "") return res.status(300).json({ message: "City is Required" })
    else {
        try {
            const { name, email, age, image } = req.body;
            const allData = await userModel.create({
                name, email, age, image
            });
            res.status(201).json({
                message: "User Created Successfully",
                allData
            })
        } catch (error) {
            res.status(400).json({
                message: "Failed to Create User",
                error: error.message
            })
        }
    }
})

app.get("/api/users", async (req, res) => {
    try {
        const allData = await userModel.find();
        res.status(200).json({
            message: "User Fecthed Successfully",
            allData
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to Find User",
            error: error.message
        })
    }
})

app.patch("/api/users/:id", async (req, res) => {
    try {
        const { name, email, age, image } = req.body;
        const id = req.params.id;
        await userModel.findByIdAndUpdate(id, { name, email, age, image })
        res.status(200).json({
            message: "User Upadated Successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to Upadate User",
            error: error.message
        })
    }
})

app.delete("/api/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await userModel.findByIdAndDelete(id);
        res.status(204).json({
            message: "User Deleted Successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to Delete"
        })
    }
})

module.exports = app;   