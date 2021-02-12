const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { deviceData, userData } = require('./db');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/device', (req, res) => {
    const body = req.body;
    deviceData(body);
    res.json(body);
});

app.post('/user', (req, res) => {
    const body = req.body;
    userData(body);
    res.json(body);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
