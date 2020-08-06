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
  res.json({ ok: true, content });
});

router.put('/contents/:id', (req, res) => {
  const { id } = req.params;
  const content = contents.filter((content) => content.id === id)[0];
  res.json({ ok: true, content });

  content.title = req.body.title;
  content.desc = req.body.desc;

  res.json({ ok: true, content });
});

router.delete('/contents/:id', (req, res) => {
  const { id } = req.params;
  const content = contents.filter((content) => content.id === id)[0];

  res.json({ ok: true, contents });
});

router.post('/addentry', (req, res) => {
  const { id, title, desc } = req.body;
  if (id && title && desc) {
    contents.push({ id, title, desc });
    res.json({ ok: true, contents });
  }
});

module.exports = router;
