const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // to parse JSON body

// POST endpoint to check integer
app.post('/check', (req, res) => {
  const { integer } = req.body;

  if (typeof integer !== 'number') {
    return res.status(400).json({ error: 'Invalid input. "integer" must be a number.' });
  }

  const result = integer > 100 ? 'high' : 'low';
  res.json({ result });
});

// Optional: GET endpoint for query param version
app.get('/check-int', (req, res) => {
  const { integer } = req.query;
  const value = parseInt(integer, 10);

  if (isNaN(value)) {
    return res.status(400).json({ error: 'Invalid input. Must be an integer.' });
  }

  const result = value > 100 ? 'high' : 'low';
  res.json({ result });
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
