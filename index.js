const express = require('express');
const dataPath = "./data/";
const app = express();
const port = 3000;
const fs = require('fs');
app.use(express.static("data"));
app.use(express.json()); // Add this line to parse JSON request bodies

let journal = [];

app.get("/api/hello", (req, res) => {
    res.send("Hello World");
});

app.get("/api/journal", (req, res) => {
    console.log("Received request for latest journal entry")
    let entry = "";
    try {
        fs.readFile('./data/journal.txt', 'utf8', (err, data) => {
            if (err) { console.error(err); res.status(500).send("Error reading journal file"); return; }
            entry = data.split("\n")[data.split("\n").length - 2]; // Adjusted to get the last entry correctly
            res.status(200).send(entry);
            console.log("returned latest journal entry")
        });
    } catch (err) {
        res.status(500).send("Error reading journal file");
        return;
    }
});

app.get("/api/journal/:id", (req, res) => {
    console.log("Received request for journal entry number " + req.params.id)
    let entry = "";
    try {
        fs.readFile('./data/journal.txt', 'utf8', (err, data) => {
            if (err) { console.error(err); res.status(500).send("Error reading journal file"); return; }
            entry = data.split("\n")[req.params.id];
            if (entry === "") {
                res.status(404).send("Journal entry not found");
                return;
            }
            res.status(200).send(entry);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error reading journal file");
        return;
    }
});

app.post("/api/journal", (req, res) => {
    const now = new Date(Date.now());
    console.log("Received request to add journal entry")
    try {
        const entryBody = req.body.entry; // Ensure the request body contains an 'entry' field
        const newEntry = `${now.toISOString()} - ${entryBody}`;
        fs.appendFileSync(dataPath + 'journal.txt', newEntry + "\n");
        console.log("added new journal entry")
        res.status(200).send("Journal entry added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error writing to journal file");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Data path is ${dataPath}`);
    journal = fs.readFile('./data/journal.txt', 'utf8', (err, data) => {
        if (err) { console.error(err); return; }
        console.log(data);
    });
});
