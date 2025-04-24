// server.js
// Entry point for our Node.js Express server

// Load environment variables from .env file
require('dotenv').config();

// Import Express framework
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Import and use MongoDB connection
const { connectDB } = require('./config/db');
connectDB();

// Basic route for testing
app.get('/', (req, res) => {
  // req: request object, res: response object
  res.send('Hello from Express server!');
});

// Mount routes for tasks and auth
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Basic error handling middleware (placeholder for learning)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server on port from .env or default 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
