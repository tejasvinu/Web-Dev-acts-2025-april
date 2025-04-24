// Navigation component to handle app navigation
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  // Navigation items with active state handling
  const navItems = [
    { path: '/tasks', label: 'Tasks', requiresAuth: true },
    { path: '/examples', label: 'React Examples', requiresAuth: false },
  ];

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-white text-xl font-bold">
                Todo App
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                (!item.requiresAuth || isAuthenticated) && (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      location.pathname === item.path
                        ? 'border-white text-white'
                        : 'border-transparent text-blue-100 hover:border-blue-200 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    location.pathname === '/login'
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    location.pathname === '/register'
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            (!item.requiresAuth || isAuthenticated) && (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          ))}
          
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className={`block px-3 py-2 text-base font-medium ${
                  location.pathname === '/login'
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`block px-3 py-2 text-base font-medium ${
                  location.pathname === '/register'
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
