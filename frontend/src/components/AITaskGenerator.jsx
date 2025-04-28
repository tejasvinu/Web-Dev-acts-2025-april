// AITaskGenerator.jsx - Simplified component with pastel colors for generating AI tasks
import { useState } from 'react';
import { useTask } from '../context/TaskContext';

const AITaskGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const { generateAITasks, aiLoading, aiError } = useTask();
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    try {
      await generateAITasks(prompt);
      setPrompt('');
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to generate tasks:', error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden border border-blue-100">
        <form onSubmit={handleSubmit} className="p-5">
          <div className="flex flex-col space-y-4">
            <div className="text-center mb-2">
              <h2 className="text-xl font-medium text-blue-600">AI Task Generator</h2>
              <p className="text-sm text-blue-400 mt-1">Describe your goal, project, or situation</p>
            </div>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., I need to plan a website redesign project..."
              className="w-full h-28 px-4 py-3 bg-white rounded-md border border-blue-200 
                         text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-300 resize-none transition-colors"
              disabled={aiLoading}
            />
            
            <button 
              type="submit"
              disabled={aiLoading || !prompt.trim()}
              className={`w-full py-2 rounded-md font-medium transition-colors
                ${aiLoading 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'}
                ${!prompt.trim() ? 'opacity-70 cursor-not-allowed' : 'opacity-100'}`}
            >
              {aiLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Tasks...
                </span>
              ) : (
                'Generate Tasks'
              )}
            </button>
          </div>
        </form>
        
        {aiError && (
          <div className="px-4 py-2 bg-red-100 border-t border-red-200 text-center text-red-600 text-sm">
            {aiError}
          </div>
        )}
        
        {isSuccess && (
          <div className="px-4 py-2 bg-green-100 border-t border-green-200 text-center text-green-600 text-sm">
            Tasks generated successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default AITaskGenerator;
