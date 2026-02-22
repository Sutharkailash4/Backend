const app = require("./src/app");

let port = 3000;

const NoteData = [];

app.post('/notes', (req, res) => {
    NoteData.push(req.body);
    res.status(201).json({
        "Message": "Data is Added Successfully"
    })
})

app.get('/notes', (req, res) => {
    res.send(NoteData);
})

app.delete('/notes/:index', (req, res) => {
    let idx = Number(req.params.index);
    if (idx < 0 || idx >= NoteData.length) res.send("wrong index");
    else {
        NoteData.splice(idx, 1);
        res.status(204).json({
            Message : "Note is Deleted Succesfully"
        })
    }
})

app.listen(port, () => {
    console.log("Server is strat at port 3000");
})