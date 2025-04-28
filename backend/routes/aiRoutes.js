// routes/aiRoutes.js
// Express Router for AI-related routes

const express = require('express');
const router = express.Router();
const { generateTasks, generateContent } = require('../controllers/aiController');
const auth = require('../middleware/auth');

// @route   POST /api/ai/generate-tasks
// @desc    Generate tasks using AI
router.post('/generate-tasks', auth, generateTasks);

// @route   POST /api/ai/generate-content
// @desc    Generate content using AI
router.post('/generate-content', auth, generateContent);

module.exports = router;
