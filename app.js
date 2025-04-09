const express = require('express');
const { checkInteger } = require('./checkLogic');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/check', (req, res) => {
  const { integer } = req.body;
  if (typeof integer !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const result = checkInteger(integer);
  res.json({ result });
});

module.exports = app;