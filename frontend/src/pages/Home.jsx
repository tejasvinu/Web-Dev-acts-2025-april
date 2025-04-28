// Home page component
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion'; // Import motion

function Home() {
  const { isAuthenticated } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-8 sm:py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-10 sm:mb-12" variants={itemVariants}>
        <h1 className="text-4xl font-extrabold text-gray-100 sm:text-5xl mb-4 tracking-tight">
          Welcome to <span className="text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">MindTask</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Organize your thoughts on a digital craft board. Powered by React & AI.
        </p>
      </motion.div>

      <motion.div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12" variants={containerVariants}>
        {/* Dark theme cards with glow effects and animations */}
        <motion.div
          className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-lg border border-rose-900/50 shadow-lg shadow-rose-900/10 transition-shadow duration-300 hover:shadow-rose-900/20"
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(159, 18, 57, 0.2)' }}
        >
          <h2 className="text-2xl font-bold text-rose-300 mb-4">Task Management</h2>
          <p className="text-gray-300 mb-6">
            Create, update, and manage your tasks. Stay organized and focused.
          </p>
          {isAuthenticated ? (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/tasks"
                className="inline-block px-5 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition text-sm font-medium shadow-md shadow-rose-900/20"
              >
                Go to Tasks
              </Link>
            </motion.div>
          ) : (
             <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/login"
                className="inline-block px-5 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition text-sm font-medium shadow-md shadow-rose-900/20"
              >
                Login to Get Started
              </Link>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-lg border border-sky-900/50 shadow-lg shadow-sky-900/10 transition-shadow duration-300 hover:shadow-sky-900/20"
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(8, 100, 149, 0.2)' }}
        >
          <h2 className="text-2xl font-bold text-sky-300 mb-4">Learning Resources</h2>
          <p className="text-gray-300 mb-6">
            Explore React concepts demonstrated in this application.
          </p>
           <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/examples"
              className="inline-block px-5 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition text-sm font-medium shadow-md shadow-sky-900/20"
            >
              View React Examples
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features section with dark theme and animation */}
      <motion.div
        className="bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-teal-900/50 shadow-lg shadow-teal-900/10"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-bold text-teal-300 mb-4">Key React Concepts Covered</h2>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Components & Props</li>
            <li>State & Lifecycle (Class & Hooks)</li>
            <li>Conditional Rendering</li>
            <li>Lists and Keys</li>
            <li>Forms (Controlled Components)</li>
            <li>Lifting State Up</li>
          </ul>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Composition vs. Inheritance</li>
            <li>Context API</li>
            <li>Refs and the DOM</li>
            <li>Error Boundaries</li>
            <li>Code Splitting (Lazy/Suspense)</li>
            <li>Advanced Hooks (useReducer, Custom Hooks)</li>
            <li>Memoization (React.memo, useMemo)</li>
            <li>Portals & forwardRef</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Home;
