const express = require('express');
const dataPath = "./data/";
const app = express();
const port = 3000;

app.use(express.static("data"));

app.get("/api/hello", (req, res) => {
    res.send("Hello World");
});

app.get("/api/wilder", (req, res) => {
    res.send()
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});