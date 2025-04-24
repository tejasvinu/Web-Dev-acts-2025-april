// controllers/taskController.js
// Controller functions for Task routes

const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
exports.getTasks = async (req, res, next) => {
  try {
    // Only return tasks for the logged-in user
    const tasks = await Task.find({ user: req.user.id });
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
    const { title, description = '', priority = 'medium' } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    // Associate task with the logged-in user
    const task = await Task.create({ title, description, priority, user: req.user.id });
    res.status(201).json({ task });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Public
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, completed, priority } = req.body;
    // Only allow updating user's own tasks
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { $set: { title, description, completed, priority } },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ task: updatedTask });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Only allow deleting user's own tasks
    const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user.id });
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

