// Home page component
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
          Welcome to React Todo App
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A comprehensive todo application built with React to demonstrate fundamental and advanced React concepts.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Task Management</h2>
          <p className="text-gray-600 mb-6">
            Create, update, and manage your tasks with our intuitive interface. Stay organized and never miss a deadline.
          </p>
          {isAuthenticated ? (
            <Link
              to="/tasks"
              className="inline-block px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Go to Tasks
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-block px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Login to Get Started
            </Link>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Learning Resources</h2>
          <p className="text-gray-600 mb-6">
            Explore React concepts with interactive examples. Perfect for teaching or learning modern React development.
          </p>
          <Link
            to="/examples"
            className="inline-block px-5 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            View React Examples
          </Link>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Key React Concepts Covered</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Lists and Keys</li>
            <li>Rendering Multiple Components</li>
            <li>Basic List Component</li>
            <li>Working with Forms and Inputs</li>
          </ul>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Refs and the DOM</li>
            <li>Lifting State Up</li>
            <li>Error Boundaries</li>
            <li>Composition vs. Inheritance</li>
            <li>Thinking in React</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
