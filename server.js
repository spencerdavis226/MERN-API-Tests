const express = require('express');
const app = express();
const port = process.env.port || 5000;
const User = require('./models/User');

// Middleware
app.use(express.json());

// Basic route to test the API
app.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

// POST endpoint to create a new user
app.post('/users', async (req, res) => {
  try {
    const newUser = new User({ name: req.body.name });
    const savedUser = await newUser.save(); // Saves newUser to database
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET endpoint to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Finds all users
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
