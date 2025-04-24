// routes/taskRoutes.js
// Express Router for task-related routes

const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/auth');

// @route   GET /api/tasks
// @desc    Get all tasks
router.get('/', auth, getTasks);

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', auth, createTask);

// @route   PUT /api/tasks/:id
// @desc    Update a task
router.put('/:id', auth, updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', auth, deleteTask);

module.exports = router;
