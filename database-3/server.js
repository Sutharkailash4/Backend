require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/database");
const user = require("./src/model/usermodel");
const port = 3000;

connectToDb();

app.post('/users', async (req, res) => {
    const { name, age, city } = req.body;

    const userData = await user.create({
        name,
        age,
        city
    })

    res.status(201).json({
        message: "User Created Successfully",
        userData
    })

})

app.get('/users', async (req, res) => {
    const userData = await user.find();
    res.status(200).json({
        userData
    })
})

app.listen(port, () => {
    console.log("Server is running on port 3000");
})