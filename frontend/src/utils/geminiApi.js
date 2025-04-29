// Import the API utilities that now communicate with the backend
import { aiApi } from './api';

/**
 * Generate tasks based on user input using Google's Gemini API via backend
 * @param {string} userInput - User prompt for task generation
 * @returns {Promise<Array>} Array of generated tasks
 */
export const generateTasks = async (userInput) => {
  try {
    // Forward the request to the backend AI API
    const response = await aiApi.generateTasks(userInput);
    return response.data.tasks;
  } catch (error) {
    console.error('Error generating tasks:', error);
    throw error;
  }
};

/**
 * Call Gemini API to generate content based on user input
 * @param {string} userInput - User prompt for content generation
 * @returns {Promise<string>} The model's response text
 */
export const generateGeminiContent = async (userInput) => {
  try {
    // Forward the request to the backend AI API
    const response = await aiApi.generateContent(userInput);
    return response.data.content;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

/**
 * Generate content from Gemini API using OpenAI-compatible request/response format
 * @param {string} userInput - User prompt for content generation
 * @returns {Promise<string>} The model's response text
 */
export const generateGeminiOpenAICompatible = async (userInput) => {
  try {
    // Forward the request to the same endpoint as generateGeminiContent
    const response = await aiApi.generateContent(userInput);
    return response.data.content;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};
