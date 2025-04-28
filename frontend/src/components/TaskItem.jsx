// TaskItem component with cardboard craft paper strip aesthetic
import { useState, memo } from 'react';
import { useTask } from '../context/TaskContext';

// Using memo for performance optimization
const TaskItem = memo(function TaskItem({ task }) {
  const { updateTask, deleteTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  
  // Softer pastel colors for priority indicators
  const priorityClasses = {
    low: 'text-emerald-700/80',
    medium: 'text-amber-700/80',
    high: 'text-rose-700/80'
  };
  
  // Updated color scheme for task items in dark theme
  const priorityColors = {
    low: {
      bg: 'rgba(6, 78, 59, 0.3)', // dark teal
      border: '#0d9488',
      text: 'text-teal-300'
    },
    medium: {
      bg: 'rgba(80, 59, 0, 0.3)', // dark amber
      border: '#d97706',
      text: 'text-amber-300'
    },
    high: {
      bg: 'rgba(127, 29, 29, 0.3)', // dark red
      border: '#dc2626',
      text: 'text-rose-300'
    }
  };
  
  // Default to medium if no priority specified
  const priority = task.priority || 'medium';
  const colorSet = priorityColors[priority];
  
  // Handle task completion toggle
  const handleToggleComplete = () => {
    updateTask(task._id, { completed: !task.completed });
  };
  
  // Handle task delete
  const handleDelete = () => {
    if (window.confirm('Remove this task?')) {
      deleteTask(task._id);
    }
  };
  
  // Handle task edit submit
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (editedTitle.trim()) {
      updateTask(task._id, { title: editedTitle });
      setIsEditing(false);
    }
  };
  
  // Cancel editing
  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };
  
  return (
    // Task item with dark theme styling
    <div 
      className={`py-3 px-4 rounded-md border shadow-md overflow-hidden group
        ${task.completed ? 'opacity-60' : 'opacity-100'}`} 
      style={{
        backgroundColor: task.completed ? 'rgba(31, 31, 36, 0.8)' : colorSet.bg,
        borderColor: task.completed ? '#374151' : colorSet.border,
        boxShadow: task.completed ? 'none' : `0 1px 3px 0 rgba(${colorSet.border}, 0.1), 0 1px 2px -1px rgba(${colorSet.border}, 0.1)`
      }}
    >
      {isEditing ? (
        // Edit form with dark theme styling
        <form onSubmit={handleSubmitEdit} className="flex items-center space-x-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-grow px-3 py-2 text-sm bg-gray-900 rounded border border-gray-700
                      text-gray-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
            autoFocus
          />
          <button 
            type="submit"
            className="px-2.5 py-1.5 text-xs bg-sky-600 text-white rounded font-medium hover:bg-sky-700"
          >
            Save
          </button>
          <button 
            type="button"
            onClick={handleCancelEdit}
            className="px-2.5 py-1.5 text-xs bg-gray-700 text-gray-300 rounded font-medium hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="flex items-start gap-3">
          {/* Checkbox with glow effect */}
          <button 
            className={`mt-0.5 flex-shrink-0 h-4 w-4 rounded border transition-colors cursor-pointer
              ${task.completed 
                ? 'bg-teal-600 border-teal-700' 
                : 'bg-gray-900 border-gray-600 hover:border-teal-500'}`}
            onClick={handleToggleComplete}
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
            style={{
              boxShadow: task.completed ? '0 0 5px rgba(13, 148, 136, 0.5)' : 'none'
            }}
          >
            {task.completed && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          <div className="flex-grow min-w-0"> 
            {/* Task content with better typography */}
            <h3 className={`text-sm font-medium break-words ${task.completed ? 'text-gray-500' : 'text-gray-200'}`}
                style={{ fontFamily: "'Quicksand', sans-serif" }}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`text-xs mt-1 break-words ${task.completed ? 'text-gray-600' : 'text-gray-400'}`}
                 style={{ fontFamily: "'Quicksand', sans-serif" }}>
                {task.description}
              </p>
            )}
            
            {/* Task metadata with dark theme styling */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {task.priority && (
                <span className={`inline-block text-xs px-1.5 py-0.5 rounded-sm bg-gray-900 border ${colorSet.text}`}
                      style={{ borderColor: colorSet.border }}>
                  {task.priority}
                </span>
              )}
              
              {task.dueDate && (
                <span className={`inline-block text-xs px-1.5 py-0.5 rounded-sm bg-gray-900 border
                  ${new Date(task.dueDate) < new Date() && !task.completed 
                    ? 'text-rose-300 border-rose-800' 
                    : 'text-sky-300 border-sky-800'}`}>
                  {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>
          </div>
          
          {/* Action buttons with glow effect */}
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              aria-label="Edit task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              aria-label="Delete task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default TaskItem;
