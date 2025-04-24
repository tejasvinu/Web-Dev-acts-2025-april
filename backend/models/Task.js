// models/Task.js
// Mongoose schema and model for Task

const mongoose = require('mongoose');

// Define Task schema
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Export Task model
module.exports = mongoose.model('Task', TaskSchema);
