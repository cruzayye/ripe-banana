const express = require('express');
const app = express();
const studios = require('./routes/studios');


app.use(express.json());

app.use('/studios', studios);

module.exports = app;
