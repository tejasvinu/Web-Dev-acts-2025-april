// Navigation component to handle app navigation
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function Navigation() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [hoverLink, setHoverLink] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to adjust navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    logout();
  };

  const handleCreateTask = () => {
    navigate('/tasks');
  };

  // Navigation items with active state handling
  const navItems = [
    { path: '/tasks', label: 'Tasks', requiresAuth: true },
    { path: '/examples', label: 'Examples', requiresAuth: false },
  ];

  return (
    // Enhanced navbar with improved glass effect and animations
    <motion.nav
      className={`sticky top-0 z-20 border-b transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/80 backdrop-blur-md border-gray-800' 
          : 'bg-gray-900/60 backdrop-blur-sm border-gray-800/50'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="relative text-rose-400 text-lg font-medium flex items-center gap-2"
                  style={{ letterSpacing: '0.3px' }}
                  onMouseEnter={() => setHoverLink('home')}
                  onMouseLeave={() => setHoverLink(null)}
            >
              {/* Logo with enhanced animation */}
              <motion.span
                className="w-8 h-8 rounded-lg bg-rose-900/40 flex items-center justify-center text-rose-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: hoverLink === 'home'
                    ? '0 0 15px 2px rgba(244, 63, 94, 0.3)'
                    : '0 0 8px 1px rgba(244, 63, 94, 0.15)'
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  animate={{
                    boxShadow: hoverLink === 'home'
                      ? [
                          '0 0 0px 0px rgba(244, 63, 94, 0)',
                          '0 0 4px 2px rgba(244, 63, 94, 0.3)',
                          '0 0 0px 0px rgba(244, 63, 94, 0)'
                        ]
                      : '0 0 0px 0px rgba(244, 63, 94, 0)'
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: hoverLink === 'home' ? Infinity : 0,
                    repeatType: 'loop'
                  }}
                />
              </motion.span>
              <motion.span
                animate={{
                  color: hoverLink === 'home' ? '#f87171' : '#fb7185',
                  textShadow: hoverLink === 'home' ? '0 0 8px rgba(244, 63, 94, 0.5)' : 'none'
                }}
                transition={{ duration: 0.3 }}
              >
                MindTask
              </motion.span>
            </Link>

            {/* Animated navigation links */}
            <div className="hidden sm:ml-10 sm:flex sm:space-x-1">
              {navItems.map((item) => (
                (!item.requiresAuth || isAuthenticated) && (
                  <motion.div
                    key={item.path}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link
                      to={item.path}
                      className={`relative text-sm px-3 py-1.5 rounded-md transition-all duration-200 overflow-hidden group`}
                      onMouseEnter={() => setHoverLink(item.path)}
                      onMouseLeave={() => setHoverLink(null)}
                    >
                      <motion.span
                        className="absolute inset-0 rounded-md z-0"
                        initial={false}
                        animate={{
                          backgroundColor: location.pathname === item.path
                            ? 'rgba(30, 41, 59, 0.8)'
                            : hoverLink === item.path
                              ? 'rgba(30, 41, 59, 0.4)'
                              : 'rgba(30, 41, 59, 0)'
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.span
                        className={`relative z-10 ${
                          location.pathname === item.path
                            ? 'text-sky-400'
                            : 'text-gray-300'
                        }`}
                        animate={{
                          textShadow: location.pathname === item.path
                            ? '0 0 8px rgba(56, 189, 248, 0.5)'
                            : 'none',
                          color: hoverLink === item.path && location.pathname !== item.path
                            ? '#93c5fd'
                            : location.pathname === item.path
                              ? '#38bdf8'
                              : '#d1d5db'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.label}
                      </motion.span>
                      {location.pathname === item.path && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"
                          layoutId="activeNavIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              ))}
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-3">
            {/* New Task button - only shown when authenticated */}
            {isAuthenticated && (
              <motion.button
                onClick={handleCreateTask}
                className="px-3 py-1.5 bg-teal-600/80 text-teal-50 rounded-md text-sm flex items-center gap-1 group"
                whileHover={{
                  backgroundColor: 'rgba(13, 148, 136, 0.9)',
                  scale: 1.03,
                  boxShadow: '0 0 10px rgba(20, 184, 166, 0.5)'
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>New Task</span>
              </motion.button>
            )}
            
            {isAuthenticated ? (
              <motion.button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-rose-900/30 text-rose-400 rounded-md text-sm"
                whileHover={{
                  backgroundColor: 'rgba(190, 18, 60, 0.4)',
                  scale: 1.03,
                  boxShadow: '0 0 10px rgba(244, 63, 94, 0.3)'
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                Logout
              </motion.button>
            ) : (
              <div className="flex space-x-4">
                {[
                  { to: '/login', label: 'Login' },
                  { to: '/register', label: 'Register' }
                ].map((link) => (
                  <motion.div
                    key={link.to}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link
                      to={link.to}
                      className={`px-3 py-1.5 rounded-md text-sm transition-colors relative overflow-hidden`}
                      onMouseEnter={() => setHoverLink(link.to)}
                      onMouseLeave={() => setHoverLink(null)}
                    >
                      <motion.span
                        className="absolute inset-0 rounded-md z-0"
                        animate={{
                          backgroundColor: location.pathname === link.to
                            ? 'rgba(7, 89, 133, 0.4)'
                            : hoverLink === link.to
                              ? 'rgba(30, 41, 59, 0.4)'
                              : 'rgba(30, 41, 59, 0)'
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.span
                        className="relative z-10"
                        animate={{
                          color: location.pathname === link.to
                            ? '#38bdf8'
                            : hoverLink === link.to
                              ? '#93c5fd'
                              : '#d1d5db',
                          textShadow: location.pathname === link.to
                            ? '0 0 8px rgba(56, 189, 248, 0.5)'
                            : 'none'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {link.label}
                      </motion.span>
                      {location.pathname === link.to && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"
                          layoutId="activeNavIndicator2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu with animations */}
      <div className="sm:hidden px-4 py-2 border-t border-gray-800/70" id="mobile-menu">
        <motion.div
          className="flex flex-wrap justify-between gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {/* Add New Task button for mobile */}
          {isAuthenticated && (
            <motion.button
              onClick={handleCreateTask}
              className="py-1.5 px-3 text-xs bg-teal-600/80 text-teal-50 rounded-md flex items-center gap-1"
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(13, 148, 136, 0.9)' }}
              whileTap={{ scale: 0.97 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Task</span>
            </motion.button>
          )}
        
          {navItems.map((item) => (
            (!item.requiresAuth || isAuthenticated) && (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={item.path}
                  className={`py-1.5 px-3 text-xs rounded-md block relative overflow-hidden`}
                >
                  <motion.span
                    className="absolute inset-0 rounded-md z-0"
                    initial={false}
                    animate={{
                      backgroundColor: location.pathname === item.path
                        ? 'rgba(30, 41, 59, 0.8)'
                        : 'rgba(30, 41, 59, 0)'
                    }}
                  />
                  <motion.span
                    className="relative z-10"
                    animate={{
                      color: location.pathname === item.path ? '#38bdf8' : '#9ca3af',
                      textShadow: location.pathname === item.path
                        ? '0 0 8px rgba(56, 189, 248, 0.5)'
                        : 'none'
                    }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              </motion.div>
            )
          ))}

          {isAuthenticated ? (
            <motion.button
              onClick={handleLogout}
              className="py-1.5 px-3 text-xs bg-rose-900/30 text-rose-400 rounded-md"
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(190, 18, 60, 0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              Logout
            </motion.button>
          ) : (
            <>
              {[
                { to: '/login', label: 'Login' },
                { to: '/register', label: 'Register' }
              ].map((link) => (
              <motion.div
                key={link.to}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={link.to}
                  className={`py-1.5 px-3 text-xs rounded-md block relative overflow-hidden`}
                >
                  <motion.span
                    className="absolute inset-0 rounded-md z-0"
                    initial={false}
                    animate={{
                      backgroundColor: location.pathname === link.to
                        ? 'rgba(7, 89, 133, 0.4)'
                        : 'rgba(30, 41, 59, 0)'
                    }}
                  />
                  <motion.span
                    className="relative z-10"
                    animate={{
                      color: location.pathname === link.to ? '#38bdf8' : '#9ca3af',
                      textShadow: location.pathname === link.to
                        ? '0 0 8px rgba(56, 189, 248, 0.5)'
                        : 'none'
                    }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navigation;
