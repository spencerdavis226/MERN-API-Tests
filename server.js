const express = require('express');
const app = express();
const port = process.env.port || 5000;

// Middleware
app.use(express.json());

// Basic route to test the API
app.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
