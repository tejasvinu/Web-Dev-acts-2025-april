// Tasks page component that demonstrates composition vs inheritance through component composition
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ErrorBoundary from '../components/ErrorBoundary';

// The Tasks component is a composition of other components rather than inheriting from a base class
function Tasks() {
  const { user } = useAuth();
  const { addTask, loading } = useTask();
  const [isFormVisible, setIsFormVisible] = useState(true);
  
  console.log(user)
  // Lifting state up: This component manages the state of whether the form is visible,
  // and passes that state down to child components
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };
  
  // Handle form submission and create a new task
  const handleCreateTask = async (taskData) => {
    try {
      await addTask(taskData);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
        <div className="flex items-center">
          <span className="mr-4 text-gray-700">Hello, {user?.email || 'User'}</span>
          <button 
            onClick={toggleForm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isFormVisible ? 'Hide Form' : 'Add Task'}
          </button>
        </div>
      </div>
      
      {/* Using error boundary to catch errors in child components */}
      <ErrorBoundary>
        {/* Containment: TaskForm is contained within this section */}
        <section className="mb-8">
          {isFormVisible && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-blue-50 border-b border-blue-100">
                <h2 className="text-xl font-semibold text-blue-800">Create New Task</h2>
              </div>
              <div className="p-4">
                {/* Composition: TaskForm is composed here, not inherited */}
                <TaskForm onSubmit={handleCreateTask} buttonText="Add Task" />
              </div>
            </div>
          )}
        </section>
        
        {/* Specialization: TaskList is a specialized component for listing tasks */}
        <section>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-2 text-gray-600">Loading tasks...</p>
            </div>
          ) : (
            <TaskList />
          )}
        </section>
      </ErrorBoundary>
    </div>
  );
}

export default Tasks;
