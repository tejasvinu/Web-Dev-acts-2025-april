// Tasks page with AI task generation and clean, pastel design
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import ErrorBoundary from '../components/ErrorBoundary';
import AITaskGenerator from '../components/AITaskGenerator';

// The Tasks component with clean, minimalistic design
function Tasks() {
  const { user } = useAuth();
  const { loading } = useTask();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 py-3 px-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <h1 className="text-2xl font-medium text-gray-800">Mind<span className="text-blue-600">Task</span></h1>
          <div className="flex items-center gap-2">
            <div className="text-gray-600 text-sm">
              {user?.email || 'User'}
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
              {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <ErrorBoundary>
            <section className="mb-8">
              <AITaskGenerator />
            </section>
            
            <section>
              <TaskList />
            </section>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
