// AITaskGenerator.jsx - Redesigned with clearer visual boundaries
import { useState, useEffect, useRef } from 'react';
import { useTask } from '../context/TaskContext';
import { motion, AnimatePresence } from 'framer-motion';

const AITaskGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const { generateAITasks, aiLoading, aiError } = useTask();
  const [isSuccess, setIsSuccess] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');
  const fullPlaceholder = "Describe your goals, plans, or ideas...";
  const textareaRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // Animated typing effect for placeholder
  useEffect(() => {
    if (!isFocused && prompt === '') {
      let currentCharIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentCharIndex <= fullPlaceholder.length) {
          setPlaceholderText(fullPlaceholder.substring(0, currentCharIndex));
          currentCharIndex++;
        } else {
          clearInterval(typingInterval);
          // Optional: Restart typing after a pause
          // setTimeout(() => setPlaceholderText(''), 2000);
        }
      }, 50); // Slightly faster typing

      return () => clearInterval(typingInterval);
    } else if (isFocused) {
        setPlaceholderText(''); // Clear animated placeholder when focused
    }
  }, [isFocused, prompt]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || aiLoading) return;

    try {
      await generateAITasks(prompt);
      setPrompt('');
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to generate tasks:', error);
      // aiError state is already set in context
    }
  };

  // Animations and variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="w-full max-w-xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ fontFamily: "'Quicksand', sans-serif" }}
    >
      <motion.div
        className="relative bg-gray-800/80 backdrop-blur-md rounded-lg border border-gray-700 shadow-lg overflow-hidden" // Added overflow-hidden
        variants={itemVariants}
        whileHover={{ boxShadow: '0 0 25px rgba(56, 189, 248, 0.1)' }} // Subtle hover shadow
        transition={{ duration: 0.3 }}
        // Removed loading animation from container, moved to button/overlay
      >
        <form onSubmit={handleSubmit} className="p-5 relative z-10"> {/* Ensure form is above loading overlay */}
          <div className="flex flex-col space-y-4"> {/* Increased spacing */}
            <motion.div
              className="text-center mb-1"
              variants={itemVariants}
            >
              <h2 className="text-lg font-medium text-sky-300 tracking-wide">Let AI help plan your tasks</h2>
            </motion.div>

            {/* Animated textarea */}
            <motion.div
              className="relative"
              variants={itemVariants}
            >
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={isFocused ? fullPlaceholder : placeholderText}
                className={`w-full h-24 px-4 py-3 bg-gray-900/80 rounded-md border transition-all duration-300
                         text-gray-100 placeholder-gray-500 focus:outline-none resize-none
                         ${isFocused ? 'border-sky-500 shadow-[0_0_15px_rgba(56,189,248,0.2)]' : 'border-gray-700 hover:border-gray-600'}`}
                disabled={aiLoading}
                rows="3" // Explicit rows
              />

              {/* Animated cursor when placeholder is typing */}
              {!isFocused && prompt === '' && placeholderText.length < fullPlaceholder.length && placeholderText.length > 0 && (
                <motion.span
                  className="absolute top-3 left-4 h-5 w-px bg-gray-500"
                  style={{ transform: `translateX(${placeholderText.length * 7.5}px)` }} // Adjust multiplier as needed for font
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
                  aria-hidden="true"
                />
              )}
            </motion.div>

            {/* Animated button */}
            <motion.button
              type="submit"
              disabled={aiLoading || !prompt.trim()}
              className={`relative mx-auto py-2 px-6 rounded-md text-sm font-medium transition-all duration-300 overflow-hidden
                ${aiLoading
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-sky-600 text-white hover:bg-sky-700'}
                ${!prompt.trim() ? 'opacity-60 cursor-not-allowed' : 'opacity-100 hover:shadow-md hover:shadow-sky-900/30'}`}
              variants={itemVariants}
              whileHover={!aiLoading && prompt.trim() ? { scale: 1.03 } : {}}
              whileTap={!aiLoading && prompt.trim() ? { scale: 0.97 } : {}}
              style={{ willChange: 'transform' }} // Performance hint
            >
              {aiLoading ? (
                <span className="flex items-center justify-center">
                  <motion.svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400" // Use Tailwind spin
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </motion.svg>
                  Creating...
                </span>
              ) : (
                <>
                  Generate Tasks
                  {/* Subtle pulse effect on hover */}
                   <motion.span
                     className="absolute inset-0 border border-sky-400 rounded-md"
                     initial={{ scale: 1, opacity: 0 }}
                     whileHover={!aiLoading && prompt.trim() ? { scale: 1.2, opacity: [0, 0.3, 0] } : {}}
                     transition={!aiLoading && prompt.trim() ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : {}}
                     style={{ pointerEvents: 'none' }}
                   />
                </>
              )}
            </motion.button>
          </div>
        </form>

        {/* Status messages container */}
        <div className="px-5 pb-4">
          <AnimatePresence>
            {aiError && (
              <motion.div
                className="mt-2 px-3 py-2 bg-red-900/40 rounded-md text-center text-red-300 text-xs border border-red-800/50"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {aiError}
              </motion.div>
            )}

            {isSuccess && (
              <motion.div
                className="mt-2 px-3 py-2 bg-green-900/40 rounded-md text-center text-green-300 text-xs border border-green-800/50"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                  className="inline-block mr-1 font-bold"
                >
                  ✓
                </motion.span>
                Tasks created and added below!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {aiLoading && (
            <motion.div
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm rounded-lg flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2.5 h-2.5 bg-sky-400 rounded-full"
                    animate={{
                      y: [0, -8, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AITaskGenerator;
