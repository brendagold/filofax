// const express = require('express');
import express from 'express';
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3020;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./api/routes/contents'));

let server = app.listen(port, () => {
  console.log(`Express Server started on Port ${port}`);
});

module.exports = server;
