const express = require('express');
const dataPath = "./data/";
const app = express();
const port = 3000;

app.use(express.static("data"));

app.get("/api/hello", (req, res) => {
    res.send("Hello World");
});

app.get("/api/xfil", (req, res) => {
    console.log(req);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
