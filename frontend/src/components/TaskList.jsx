// TaskList component to demonstrate Lists and Keys
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
        <div className="text-center py-8 text-gray-500">
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
    return <div className="text-center py-4">Loading tasks...</div>;
  }
  
  if (error) {
    return (
      <div className="text-center py-4 text-red-600">
        Error loading tasks: {error}
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'active' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'completed' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Completed
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {renderTasks()}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} {filter !== 'all' ? `(${filter})` : ''}
      </div>
    </div>
  );
}

export default TaskList;
