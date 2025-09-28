import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';

const Navbar = () => {
  const location = useLocation();
  const { setSearchTerm } = useSearch();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const isLoggedIn = localStorage.getItem('token');

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <h1>CourseHub</h1>
          <div className="nav-links">
            {isLoggedIn ? (
              <>
                <Link to="/" className={isActive('/') ? 'active' : ''}>
                  Dashboard
                </Link>
                <Link to="/courses" className={isActive('/courses') ? 'active' : ''}>
                  Courses
                </Link>
                <Link to="/students" className={isActive('/students') ? 'active' : ''}>
                  Students
                </Link>
                <Link to="/enrollments" className={isActive('/enrollments') ? 'active' : ''}>
                  Enrollments
                </Link>
                <input
                  type="text"
                  placeholder="Search courses..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ margin: '0 10px', padding: '5px', width: '200px' }}
                />
                <button
                  className="logout-button"
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={isActive('/login') ? 'active' : ''}>
                  Login
                </Link>
                <Link to="/signup" className={isActive('/signup') ? 'active' : ''}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
