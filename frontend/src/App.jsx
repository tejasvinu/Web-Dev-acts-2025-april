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

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <TaskProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Navigation />
              
              <main className="flex-grow py-8">
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
              </main>
              
              <footer className="py-4 bg-white border-t">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                  Todo Application - Built with React and Tailwind CSS for teaching purposes
                </div>
              </footer>
            </div>
          </Router>
        </TaskProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
