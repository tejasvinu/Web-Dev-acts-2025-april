import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'
import Navigation from './components/Navigation'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Tasks from './pages/Tasks'
import ReactExamples from './pages/ReactExamples'
import ErrorBoundary from './components/ErrorBoundary'
import AnimatedBackground from './components/AnimatedBackground'
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading to ensure smooth initial animations
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <TaskProvider>
          <Router>
            {/* Immersive animated background */}
            <div className="relative min-h-screen flex flex-col font-sans overflow-hidden"
                 style={{
                   backgroundColor: "#0f0f13",
                   fontFamily: "'Quicksand', sans-serif",
                   opacity: loaded ? 1 : 0,
                   transition: "opacity 0.5s ease-in"
                 }}>
              <AnimatedBackground />
              <div className="relative z-10 flex flex-col min-h-screen">
                <Navigation />

                <main className="flex-grow py-4 px-2 sm:py-6">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/examples" element={<ReactExamples />} />

                      {/* Protected routes */}
                      <Route element={<PrivateRoute />}>
                        <Route path="/tasks" element={<Tasks />} />
                      </Route>

                      {/* Redirect to home for any undefined routes */}
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </AnimatePresence>
                </main>

                {/* Footer with animation */}
                <footer className="py-3 mt-4 border-t border-gray-800 bg-gray-900/30 backdrop-blur-sm">
                  <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-xs">
                    MindTask - Organize Your Thoughts
                  </div>
                </footer>
              </div>
            </div>
          </Router>
        </TaskProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
