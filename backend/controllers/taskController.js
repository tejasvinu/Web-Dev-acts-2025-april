// controllers/taskController.js
// Controller functions for Task routes

const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json({ tasks });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
exports.createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const task = await Task.create({ title });
    res.status(201).json({ task });
  } catch (err) {
    next(err);
  }
};

