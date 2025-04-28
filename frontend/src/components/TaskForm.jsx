// A form component styled like a paper label on cardboard
import { useState, useEffect, useRef } from 'react';

function TaskForm({ task = null, onSubmit, buttonText = 'Save Task' }) {
  // Form state using React's useState hook
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});
  
  // Reference to the title input using React's useRef hook (Refs and the DOM)
  const titleInputRef = useRef(null);
    // If task is provided (for editing), populate form fields
  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setPriority(task.priority || 'medium');
      
      // Format the due date for datetime-local input if it exists
      if (task.dueDate) {
        // Format: YYYY-MM-DDThh:mm
        const date = new Date(task.dueDate);
        const formattedDate = date.toISOString().slice(0, 16);
        setDueDate(formattedDate);
      } else {
        setDueDate('');
      }
    } else {
      // Reset form when task is null (for creating new tasks)
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    }
    
    // Focus the title input when the component mounts
    titleInputRef.current?.focus();
  }, [task]);
  
  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
    // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        title,
        description,
        priority,
        dueDate: dueDate || null
      });
      
      // Reset form if not editing
      if (!task) {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
        titleInputRef.current?.focus();
      }
    }
  };
  
  return (
    // Dark themed form with subtle glow
    <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg shadow-purple-900/10 p-5 space-y-3">
      <div>
        <label htmlFor="title" className="block text-xs font-medium text-gray-300 mb-1">
          Task
        </label>
        <input
          type="text"
          id="title"
          ref={titleInputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-3 py-2 text-sm bg-gray-900 rounded-md border
            text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500
            ${errors.title ? 'border-red-700' : 'border-gray-700'}`}
          placeholder="What needs to be done?"
        />
        {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-xs font-medium text-gray-300 mb-1">
          Details
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="2"
          className="w-full px-3 py-2 text-sm bg-gray-900 rounded-md border border-gray-700
                    text-gray-100 placeholder-gray-500 focus:outline-none 
                    focus:ring-1 focus:ring-purple-500 resize-none"
          placeholder="Optional details..."
        ></textarea>
      </div>
        
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="priority" className="block text-xs font-medium text-gray-300 mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-gray-900 rounded-md border border-gray-700
                      text-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="dueDate" className="block text-xs font-medium text-gray-300 mb-1">
            Due
          </label>
          <input
            type="datetime-local"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-gray-900 rounded-md border border-gray-700
                      text-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>
      
      <div className="flex justify-end pt-1">
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white text-xs font-medium rounded-md 
                    hover:bg-purple-700 transition-colors hover:shadow-md hover:shadow-purple-900/20"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
