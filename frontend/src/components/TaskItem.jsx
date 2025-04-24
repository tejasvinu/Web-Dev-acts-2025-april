// TaskItem component to display individual task items 
import { useState, memo } from 'react';
import { useTask } from '../context/TaskContext';

// Using memo for performance optimization (advanced React concept)
const TaskItem = memo(function TaskItem({ task }) {
  const { updateTask, deleteTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  
  // Priority classes for color coding
  const priorityClasses = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };
  
  // Handle task completion toggle
  const handleToggleComplete = () => {
    updateTask(task._id, { completed: !task.completed });
  };
  
  // Handle task delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
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
    <div className={`p-4 border rounded-lg shadow-sm ${task.completed ? 'bg-gray-50' : 'bg-white'}`}>
      {isEditing ? (
        <form onSubmit={handleSubmitEdit} className="flex items-center space-x-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button 
            type="submit"
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
          <button 
            type="button"
            onClick={handleCancelEdit}
            className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              className="h-5 w-5 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              )}
              <div className="flex items-center space-x-2 mt-2">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded border ${priorityClasses[task.priority]}`}>
                  {(task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium')}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 hover:bg-gray-100 rounded-full"
              aria-label="Edit task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="p-1 hover:bg-gray-100 rounded-full"
              aria-label="Delete task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
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
