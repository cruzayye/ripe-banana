const express = require('express');
const app = express();
const studios = require('./routes/studios');
const actors = require('./routes/actors');
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');


app.use(express.json());

app.use('/actors', actors);
app.use('/studios', studios);
app.use(notFound);
app.use(handler);

module.exports = app;
