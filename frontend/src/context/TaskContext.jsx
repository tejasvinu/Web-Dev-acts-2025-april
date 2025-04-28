// Task Context for managing tasks across components
import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { taskApi, aiApi } from '../utils/api';
import { useAuth } from './AuthContext';
import { generateTasks } from '../utils/geminiApi';

// Create the context
const TaskContext = createContext();

// Custom hook for using the task context
export const useTask = () => useContext(TaskContext);

// Provider component to wrap our app and make task operations available to any child component
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Fetch all tasks when the component mounts and when authentication state changes
  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await taskApi.getTasks();
      setTasks(response.data.tasks); // Fix: use the 'tasks' array from the response
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Add a new task
  const addTask = async (taskData) => {
    setError(null);
    
    try {
      const response = await taskApi.createTask(taskData);
      // Correctly extract the task object from the response
      setTasks(prev => [...prev, response.data.task]); 
      return response.data.task; // Return the actual task object
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add task');
      throw error;
    }
  };

  // Update a task
  const updateTask = async (id, taskData) => {
    setError(null);
    
    try {
      const response = await taskApi.updateTask(id, taskData);
      // Correctly extract the updated task object from the response
      setTasks(prev => prev.map(task => 
        task._id === id ? response.data.task : task
      ));
      return response.data.task; // Return the actual updated task object
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    setError(null);
    
    try {
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete task');
      throw error;
    }
  };
  // Generate tasks using AI
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  
  const generateAITasks = async (prompt) => {
    setAiLoading(true);
    setAiError(null);
    
    try {
      // Use generateTasks without passing apiKey (now uses env var internally)
      const generatedTasks = await generateTasks(prompt);
      
      // Add each generated task to the database
      const addedTasks = [];
      for (const task of generatedTasks) {
        const addedTask = await addTask(task);
        addedTasks.push(addedTask);
      }
      
      return addedTasks;
    } catch (error) {
      setAiError(error.message || 'Failed to generate tasks');
      throw error;
    } finally {
      setAiLoading(false);
    }
  };

  // Value object that will be passed to consumers of this context
  const value = {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    generateAITasks,
    aiLoading,
    aiError
  };

  // Return the provider with the value object
  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContext;
