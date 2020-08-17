// const express = require('express');
import express from 'express';
import { contents } from '../content';
const router = express.Router();

router.get('/', (_, res) => {
  res.send('Your Express app is ready');
});

router.get('/contents', (_, res) => {
  res.json({ ok: true, contents });
});

router.get('/contents/:id', (req, res) => {
  const { id } = req.params;
  const content = contents.filter((content) => content.id === id)[0];
  if (!content) return res.status(404).send('The Id does not exist.');
  res.json({ ok: true, content });
});

router.put('/contents/:id', (req, res) => {
  const { id } = req.params;
  const content = contents.find((content) => content.id === id);
  if (!content) return res.status(404).send('The Id does not exist.');

  content.title = req.body.title;
  content.desc = req.body.desc;

  res.json({ ok: true, content });
});

router.patch('/contents/:id', (req, res) => {
  const { id } = req.params;
  const content = contents.find((content) => content.id === id);
  if (!content) return res.status(404).send('The Id does not exist.');

  content.title = req.body.title;

  if (req.body.desc) {
    content.desc = req.body.desc;
  }

  res.json({ ok: true, content });
});

router.delete('/contents/:id', (req, res) => {
  const { id } = req.params;
  const content = contents.find((content) => content.id === id);
  if (!content) return res.status(404).send('The Id does not exist.');

  const index = contents.indexOf(content);
  contents.splice(index, 1);

  res.json({ ok: true, contents });
});

router.post('/addentry', (req, res) => {
  var today = new Date();

  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  console.log(date);
  const content = {
    id: contents.length + 1,
    title: req.body.title,
    desc: req.body.desc,
    createdOn: req.body.createdOn,
  };

  if (!content)
    return res
      .status(400)
      .send('The Entry must contain title and Description.');

  contents.push(content);

  res.status(201).json({ ok: true, contents });
  //res.status(201).send(content);
  // const { id, title, desc } = req.body;
  // if (id && title && desc) {
  //   contents.push({ id, title, desc });
  //   res.json({ ok: true, contents });
  // }
});

module.exports = router;
