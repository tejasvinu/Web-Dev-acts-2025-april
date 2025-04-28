// controllers/aiController.js
// Controller functions for AI routes

const aiService = require('../services/aiService');
const Task = require('../models/Task');

// @desc    Generate AI tasks and save them for the user
// @route   POST /api/ai/generate-tasks
// @access  Private
exports.generateTasks = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    // Generate tasks using AI service
    const generatedTasks = await aiService.generateTasks(prompt);
    
    // Save each generated task to database
    const savedTasks = [];
    for (const taskData of generatedTasks) {
      const { title, description, priority, estimatedTime } = taskData;
      
      // Create task in database, associated with the user
      const task = await Task.create({
        title,
        description,
        priority,
        estimatedTime,
        user: req.user.id
      });
      
      savedTasks.push(task);
    }
    
    res.status(201).json({ 
      success: true, 
      tasks: savedTasks 
    });
  } catch (err) {
    console.error('AI Task Generation Error:', err);
    res.status(500).json({ 
      message: 'Failed to generate tasks', 
      error: err.message 
    });
  }
};

// @desc    Generate AI content
// @route   POST /api/ai/generate-content
// @access  Private
exports.generateContent = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    // Generate content using AI service
    const content = await aiService.generateContent(prompt);
    
    res.json({ 
      success: true, 
      content 
    });
  } catch (err) {
    console.error('AI Content Generation Error:', err);
    res.status(500).json({ 
      message: 'Failed to generate content', 
      error: err.message 
    });
  }
};
