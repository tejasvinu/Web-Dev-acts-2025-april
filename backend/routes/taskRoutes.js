// routes/taskRoutes.js
// Express Router for task-related routes

const express = require('express');
const router = express.Router();
const { getTasks, createTask } = require('../controllers/taskController');

// @route   GET /api/tasks
// @desc    Get all tasks
router.get('/', getTasks);

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', createTask);

module.exports = router;
