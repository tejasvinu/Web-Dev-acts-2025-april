import axios from 'axios';

/**
 * Generate tasks based on user input using Google's Gemini API directly via REST
 * @param {string} apiKey - Google Gemini API key
 * @param {string} userInput - User prompt for task generation
 * @returns {Promise<Array>} Array of generated tasks
 */
export const generateTasks = async (apiKey, userInput) => {
  try {
    // Gemini API endpoint
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    
    // Request payload
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `You are a productivity assistant specialized in creating actionable, well-structured tasks.
              Based on the following input about a project, goal, or situation, create 3-5 specific, achievable tasks.
              
              USER INPUT: ${userInput}
              
              Return your response ONLY as a JSON array of tasks with no additional text. Each task must include:
              - title: Clear, concise task title
              - description: More detailed explanation of what needs to be done
              - priority: "high", "medium", or "low"
              - estimatedTime: estimated time to complete (e.g., "30 min", "2 hours")
              
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
              ]`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 32,
        topP: 0.95,
        maxOutputTokens: 1024
      }
    };
    
    // Make API request
    const response = await axios.post(endpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    // Extract the response text
    const text = response.data.candidates[0].content.parts[0].text;
    
    // Parse JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Failed to parse JSON response from API');
    }
  } catch (error) {
    console.error('Error generating tasks:', error);
    throw error;
  }
};
