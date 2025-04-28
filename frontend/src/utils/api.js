// API utility for communicating with the backend
import axios from 'axios';

// Create an axios instance with base URL and default headers
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add an interceptor to include the auth token in requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Task-related API calls
export const taskApi = {
  // Get all tasks
  getTasks: () => api.get('/tasks'),
  
  // Get a single task by ID
  getTask: (id) => api.get(`/tasks/${id}`),
  
  // Create a new task
  createTask: (taskData) => api.post('/tasks', taskData),
  
  // Update an existing task
  updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  
  // Delete a task
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

// AI-related API calls
export const aiApi = {
  // Generate tasks using AI
  generateTasks: (prompt) => api.post('/ai/generate-tasks', { prompt }),
  
  // Generate content using AI
  generateContent: (prompt) => api.post('/ai/generate-content', { prompt }),
};

// Authentication-related API calls
export const authApi = {
  // Register a new user
  register: (userData) => api.post('/auth/register', userData),
  
  // Login a user
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Get the current user profile
  getProfile: () => api.get('/auth/me'),
};

export default api;
