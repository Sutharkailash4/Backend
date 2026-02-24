require("dotenv").config();
const app = require("./src/app");
const noteModel = require("./models/notes_model");
const connectToDatabase = require("./config/database");
let port = 3000;

connectToDatabase();

app.post('/notes', async (req, res) => {
    let { title, description } = req.body;

    const created_note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        created_note
    })
})

app.get('/notes', async (req, res) => {
   const created_notes = await noteModel.find();
   res.status(201).json({
    created_notes
   })
})

app.listen(port, () => {
    console.log("Server is running on port 30000");
})