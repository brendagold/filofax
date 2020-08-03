const express = require('express');
const router = express.Router;

const contents = [
  {
    id: '1',
    title: 'A boring day',
    desc:
      'Today was so boring, i went to the market and i slept all day when  i returned',
  },
  {
    id: '2',
    title: 'So Happy i did it',
    desc:
      'Now I am better at writing web application, guess what, today i start learning apis, hurray',
  },
];

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

router.post('/addentry', (req, res) => {
  const { id, title, desc } = req.body;
  if (id && title && desc) {
    contents.push({ id, title, desc });
    res.json({ ok: true, contents });
  }
});

module.exports = router;
