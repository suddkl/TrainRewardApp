import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Train } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { authState, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Add scroll event listener to change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-blue-700 shadow-md' : 'bg-blue-700 bg-opacity-90'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and app name */}
          <Link to="/" className="flex items-center text-white">
            <Train className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">TrainReward</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6">
            {authState.isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-blue-200 transition-colors">
                  Dashboard
                </Link>
                <Link to="/journeys" className="text-white hover:text-blue-200 transition-colors">
                  Journeys
                </Link>
                <Link to="/calendar" className="text-white hover:text-blue-200 transition-colors">
                  Calendar
                </Link>
                <Link to="/rewards" className="text-white hover:text-blue-200 transition-colors">
                  Rewards
                </Link>
                <Link to="/profile" className="text-white hover:text-blue-200 transition-colors">
                  Profile
                </Link>
                <button 
                  onClick={logout}
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-blue-200 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="text-white hover:text-blue-200 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 shadow-xl">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              {authState.isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-white hover:text-blue-200 py-2 transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/journeys" className="text-white hover:text-blue-200 py-2 transition-colors">
                    Journeys
                  </Link>
                  <Link to="/calendar" className="text-white hover:text-blue-200 py-2 transition-colors">
                    Calendar
                  </Link>
                  <Link to="/rewards" className="text-white hover:text-blue-200 py-2 transition-colors">
                    Rewards
                  </Link>
                  <Link to="/profile" className="text-white hover:text-blue-200 py-2 transition-colors">
                    Profile
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-white hover:text-blue-200 py-2 text-left transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:text-blue-200 py-2 transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" className="text-white hover:text-blue-200 py-2 transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;