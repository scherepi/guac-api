const express = require('express');
const dataPath = "./data/";
const app = express();
const port = 3000;
const fs = require('fs');
app.use(express.static("data"));

let journal = [];

app.get("/api/hello", (req, res) => {
    res.send("Hello World");
});

app.get("/api/journal", (req, res) => {
    console.log("Received request for latest journal entry")
    try {
        res.send(fs.readFileSync(dataPath + 'journal.txt', 'utf8').split("\n")[-1]);
        console.log("returned latest journal entry")
    } catch (err) {
        console.error(err);
        res.status(500).send("Error reading journal file");
    }   
});
app.post("/api/journal", (req, res) => {
    console.log("Received request to add journal entry")
    try {
        const newEntry = req.body.entry;
        fs.appendFileSync(dataPath + 'journal.txt', newEntry + "\n");
        console.log("added new journal entry")
        res.status(200).send("Journal entry added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error writing to journal file");
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Data path is ${dataPath}`);
    journal = fs.readFile('./data/journal.txt', 'utf8', (err, data) => {
        if (err) { console.error(err); return;}
        console.log(data);
    });
});
