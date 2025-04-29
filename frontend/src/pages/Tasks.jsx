// Tasks page with cardboard craft aesthetic
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import ErrorBoundary from '../components/ErrorBoundary';
import AITaskGenerator from '../components/AITaskGenerator';
import TaskForm from '../components/TaskForm';
import TaskCalendar from '../components/TaskCalendar'; // Import the calendar component
import { motion, AnimatePresence } from 'framer-motion'; // Import motion

function Tasks() {
  const { user } = useAuth();
  const [showManualForm, setShowManualForm] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const { addTask } = useTask();

  const handleManualSubmit = async (taskData) => {
    try {
      await addTask(taskData);
      setShowManualForm(false); // Hide form on successful submission
    } catch (error) {
      console.error("Failed to add task manually:", error);
      // Optionally: show an error message to the user
    }
  };

  return (
    <div className="min-h-full">
      <div className="max-w-4xl mx-auto px-4 pt-2 sm:pt-4 pb-12"> {/* Increased max-width for calendar */}
        {/* User info with dark theme styling */}
        <header className="flex justify-end items-center mb-4 sm:mb-6">
          {user && (
            <motion.div
              className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-gray-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-gray-300 text-xs font-medium">
                {user.email}
              </div>
              <div className="h-5 w-5 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-inner">
                {user.email.charAt(0).toUpperCase()}
              </div>
            </motion.div>
          )}
        </header>

        {/* Content with better spacing between components */}
        <div className="space-y-6 sm:space-y-8">
          <ErrorBoundary>
            {/* AI Generator */}
            <motion.section
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <AITaskGenerator />
            </motion.section>

            {/* Manual task toggle with dark theme styling */}
            <motion.section
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                onClick={() => setShowManualForm(!showManualForm)}
                className={`text-xs px-4 py-1.5 rounded-full transition-all duration-300 border
                  ${showManualForm
                    ? 'bg-purple-900/50 text-purple-300 border-purple-700 shadow-sm'
                    : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/80 border-gray-700 hover:border-gray-600'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showManualForm ? 'Hide manual input' : '+ Add task manually'}
              </motion.button>
            </motion.section>

            {/* Conditionally render TaskForm with animation */}
            <AnimatePresence>
              {showManualForm && (
                <motion.section
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden" // Prevent content jump during animation
                >
                  <TaskForm onSubmit={handleManualSubmit} buttonText="Add Task" />
                </motion.section>
              )}
            </AnimatePresence>

            {/* View Mode Toggle */}
            <motion.section
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex rounded-md shadow-sm bg-gray-800/70 border border-gray-700 p-0.5">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-1.5 text-xs rounded-l-md transition-colors duration-200 ${
                    viewMode === 'list' ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-700/80'
                  }`}
                >
                  List View
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-1.5 text-xs rounded-r-md transition-colors duration-200 ${
                    viewMode === 'calendar' ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-700/80'
                  }`}
                >
                  Calendar View
                </button>
              </div>
            </motion.section>

            {/* Task List or Calendar View */}
            <section className="pt-1">
              {viewMode === 'list' ? <TaskList /> : <TaskCalendar />}
            </section>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
