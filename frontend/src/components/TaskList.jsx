// TaskList component with cardboard craft aesthetic
import { useState } from 'react';
import { useTask } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { motion, AnimatePresence } from 'framer-motion';

function TaskList() {
  const { tasks, loading, error } = useTask();
  const [filter, setFilter] = useState('all');

  // Filter tasks based on completion status
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by creation date, newest first

  // Render each task item using the map function with a unique key
  const renderTasks = () => {
    if (filteredTasks.length === 0 && !loading) { // Check loading state here
      return (
        <motion.div
          className="text-center py-10 text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.p
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {tasks.length > 0 ? 'No tasks match your filter.' : 'No tasks yet. Add one above!'}
          </motion.p>
          {tasks.length === 0 && (
            <motion.div
              className="mt-4 opacity-40"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" // Document icon
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.4, ease: "circOut" }}
                />
              </svg>
            </motion.div>
          )}
        </motion.div>
      );
    }

    return (
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task._id}
            layout // Enable layout animation
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              delay: index * 0.03 // Stagger animation slightly
            }}
            className="mb-3" // Spacing between items
          >
            <TaskItem task={task} />
          </motion.div>
        ))}
      </AnimatePresence>
    );
  };

  if (loading) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16 text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} // Add exit animation
        transition={{ duration: 0.3 }}
      >
        <p className="mb-4 tracking-wider">Loading tasks...</p>
        <motion.div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-sky-500 rounded-full"
              animate={{
                y: [0, -6, 0], // Slightly less bounce
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8, // Slower animation
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="text-center py-4 px-4 bg-red-900/30 border border-red-800/50 rounded-md text-red-300 text-xs"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ letterSpacing: '0.3px' }}
      >
        Error: {error}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mt-1" // Reduced top margin
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Dark themed list container with animation */}
      <motion.div
        className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-lg"
        whileHover={{ boxShadow: '0 0 20px rgba(45, 212, 191, 0.08)' }} // More subtle hover
        transition={{ duration: 0.3 }}
      >
        {/* Task list header with animated filter options */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center mb-4 pb-3 border-b border-gray-700"
          layout // Animate layout changes
        >
          <motion.h2
            className="text-base font-medium text-teal-300 mb-2 sm:mb-0" // Add bottom margin on small screens
            animate={{
              textShadow: ['0 0 2px rgba(45, 212, 191, 0)', '0 0 6px rgba(45, 212, 191, 0.3)', '0 0 2px rgba(45, 212, 191, 0)']
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} // Smoother pulse
          >
            Your Tasks
          </motion.h2>

          {tasks.length > 0 && ( // Only show filters if there are tasks
            <motion.div
              className="inline-flex text-xs bg-gray-900/70 rounded-md p-0.5 border border-gray-700 shadow-sm"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
            >
              {['all', 'active', 'completed'].map((filterType) => (
                <motion.button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-2.5 py-1 transition-colors duration-200 rounded-sm relative capitalize`} // Capitalize text
                  whileHover={{ backgroundColor: filter !== filterType ? 'rgba(55, 65, 81, 0.5)' : '' }} // Subtle hover bg
                  whileTap={{ scale: 0.95 }}
                >
                  {filter === filterType && (
                    <motion.span
                      className="absolute inset-0 bg-teal-600/30 border border-teal-500/50 rounded-sm z-0" // Indicator style
                      layoutId="filter-indicator"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${filter === filterType ? 'text-teal-200' : 'text-gray-400 hover:text-gray-200'}`}>
                    {filterType}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Tasks displayed with better spacing and animations */}
        <div className="min-h-[100px] relative"> {/* Added relative positioning */}
          {renderTasks()}
        </div>

        {/* Task count info with animation */}
        <AnimatePresence>
          {tasks.length > 0 && filteredTasks.length > 0 && (
            <motion.div
              className="mt-3 pt-2 text-xs text-gray-500 border-t border-gray-700/50 text-right" // Align right
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              Showing {filteredTasks.length} of {tasks.length} task{tasks.length === 1 ? '' : 's'}
              {filter !== 'all' ? ` (${filter})` : ''}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default TaskList;
