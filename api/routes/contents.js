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
  let today = new Date();
  let reqBodyTitle = req.body.title;
  let reqBodyDesc = req.body.desc;
  let title = reqBodyTitle.trim();
  let desc = reqBodyDesc.trim();

  const content = {
    id: contents.length + 1,
    title: title,
    desc: desc,
    createdOn: today,
  };

  if (!title) {
    return res.status(400).json({
      status: 'failed',
      message: 'Please enter a title',
    });
  }

  if (!desc) {
    return res.status(400).json({
      status: 'failed',
      message: 'Please enter details of entry',
    });
  }

  if (title.length < 5) {
    return res.status(400).json({
      status: 'failed',
      message: 'Text must be at least 5 characters long',
    });
  }

  if (desc.length < 5) {
    return res.status(400).json({
      status: 'failed',
      message: 'Text must be at least 5 characters long',
    });
  }

  contents.push(content);

  res.status(201).json({ ok: true, contents });
});

module.exports = router;
