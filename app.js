const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const taskRouter = require('./api/routers/taskRouter');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use('/', taskRouter);

module.exports = app;
