// TaskList component with clean, simple design
import { useState } from 'react';
import { useTask } from '../context/TaskContext';
import TaskItem from './TaskItem';

function TaskList() {
  const { tasks, loading, error } = useTask();
  const [filter, setFilter] = useState('all'); // all, completed, active
  
  // Filter tasks based on completion status
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });
    // Render each task item using the map function with a unique key
  const renderTasks = () => {
    if (filteredTasks.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-md border border-gray-100">
          {tasks.length > 0 ? 'No tasks match your filter' : 'No tasks yet'}
        </div>
      );
    }
    
    // Using map to render multiple components from an array (Lists and Keys)
    return filteredTasks.map(task => (
      <TaskItem 
        key={task._id} // Unique key for each task item
        task={task}
      />
    ));
  };
  
  if (loading) {
    return <div className="text-center py-6 bg-white rounded-md shadow-sm">Loading tasks...</div>;
  }
  
  if (error) {
    return (
      <div className="text-center py-6 text-red-600 bg-red-50 rounded-md border border-red-100">
        Error loading tasks: {error}
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-700">Your Tasks</h2>
        <div className="flex space-x-1 bg-gray-50 rounded-md p-1 border border-gray-100">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              filter === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              filter === 'active' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              filter === 'completed' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>
        </div>
      </div>
      
      <div>
        {tasks.length === 0 ? (
          <div className="text-center py-8 px-4 bg-gray-50 rounded-md border border-gray-100">
            <p className="text-gray-500">Your tasks will appear here...</p>
            <p className="mt-2 text-gray-400 text-sm">Use the AI Task Generator above to create some tasks</p>
          </div>
        ) : (
          renderTasks()
        )}
      </div>
      
      {tasks.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-right">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} {filter !== 'all' ? `(${filter})` : ''}
        </div>
      )}
    </div>
  );
}

export default TaskList;
