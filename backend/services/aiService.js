// services/aiService.js
// Service for AI-related operations using OpenAI API

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Create Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate tasks based on user input using Gemini API
 * @param {string} userInput - User prompt for task generation
 * @returns {Promise<Array>} Array of generated tasks
 */
exports.generateTasks = async (userInput) => {
  try {    const prompt = `You are a productivity assistant specialized in creating actionable, well-structured tasks.
First, analyze the complexity and scope of the given input to determine the appropriate number of tasks:
- For very simple, single-action goals (e.g., 'buy milk', 'email John'): 1-2 tasks
- For medium complexity projects (e.g., 'plan weekend trip'): 3-5 tasks
- For complex projects or long-term goals (e.g., 'launch new product'): 6-10 tasks

Consider these factors when breaking down the input:
- Dependencies between tasks (what needs to be done first)
- Natural phases or stages of the project
- Level of detail needed for each task
- Whether subtasks might be needed
- Time frame and urgency

USER INPUT: ${userInput}

Return your response ONLY as a JSON array of tasks with no additional text. Each task must include:
- title: Clear, concise task title (max 10 words)
- description: Detailed explanation including any dependencies or important considerations
- priority: "high" (urgent/critical path), "medium" (important but flexible), or "low" (can be delayed if needed)
- estimatedTime: Realistic time estimate (e.g., "30 min", "2 hours", "1 day")

FORMAT EXAMPLE:
[
  {
    "title": "Task title here",
    "description": "Task description here",
    "priority": "medium",
    "estimatedTime": "1 hour"
  },
  {
    "title": "Another task",
    "description": "Another description",
    "priority": "high",
    "estimatedTime": "45 min"
  }
]`;    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
      }
    });
    const response = await result.response;
    const text = response.text();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Failed to parse JSON response from Gemini');
    }
  } catch (error) {
    console.error('Error generating tasks:', error);
    throw error;
  }
};

/**
 * Generate content based on user input
 * @param {string} userInput - User prompt for content generation
 * @returns {Promise<string>} The model's response text
 */
exports.generateContent = async (userInput) => {
  try {    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(userInput);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};
