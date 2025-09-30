# Course Hub

#### A full-stack web application for course management, built with React frontend and Flask backend, featuring authentication, dashboards, and CRUD operations for courses, students, and enrollments.

#### By **James Kamau**
#### By **Alex Mwangi**


## Description

Course Hub is a modern web application designed for educational institutions to manage courses, students, and enrollments efficiently. It provides user authentication, a dashboard for statistics, and comprehensive CRUD functionality for managing educational data. Built with React for the frontend, Flask for the backend, and SQLite for data persistence, it demonstrates full-stack development with JWT-based security and responsive UI.

## Features

- **Authentication System**: Secure login, signup, and JWT-based session management with role support
- **Dashboard Overview**: Statistics and quick access to courses, students, and enrollments
- **Course Management**: Create, view, update, and delete courses with details
- **Student Management**: Track student profiles and enrollments
- **Enrollment Tracking**: Manage student-course associations
- **CRUD Operations**: Full Create, Read, Update, and Delete for all entities
- **Data Validation**: Form validation with Formik and Yup on frontend, error handling on backend
- **SQLite Database**: Lightweight storage with tables for users, courses, students, and enrollments
- **Responsive UI**: Monochromatic theme with mobile-friendly design
- **API Integration**: RESTful endpoints with authentication middleware

## Technologies Used

- **React 18+**: Frontend framework for building user interfaces
- **Flask**: Python web framework for backend API
- **SQLite**: Lightweight database engine
- **JWT & Bcrypt**: Authentication and password hashing
- **Formik & Yup**: Form handling and validation
- **React Router**: Client-side routing
- **Axios**: API client for frontend-backend communication
- **Node.js/npm**: Frontend dependency management
- **Python/pip**: Backend dependency management

## Project Structure
COURSE-HUB/
├── client/ # React frontend
│   ├── public/ # Static assets
│   │   └── index.html
│   ├── src/ # Source code
│   │   ├── components/ # Reusable UI components (e.g., Login, Dashboard)
│   │   ├── pages/ # Page components (e.g., Signup, Courses)
│   │   ├── api.js # API client configuration
│   │   ├── App.js # Main app with routing
│   │   ├── index.js # Entry point
│   │   └── index.css # Global styles (monochromatic theme)
│   ├── package.json # Frontend dependencies
│   └── ... # Other frontend files
├── server/ # Flask backend
│   ├── app.py # Main Flask application
│   ├── authentication.py # Auth routes and middleware
│   ├── config.py # Configuration settings
│   ├── resources.py # CRUD API endpoints
│   ├── requirements.txt # Backend dependencies
│   └── ... # Other backend files (e.g., models, database init)
├── .gitignore # Git ignore rules
├── TODO.md # Development task tracker
├── LICENSE # Project license
└── README.md # Project documentation

## Installation and Setup

### Prerequisites

- Node.js 14+ and npm (for frontend)
- Python 3.8+ and pip (for backend)

### Installation Process

1. **Navigate to the project directory**:
  ```bash
  cd COURSE-HUB
  ```

2. **Backend Setup (Server)**:
   ```bash
   cd server
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   # Initialize database (if init script exists, run it; otherwise, app.py handles on startup)
   cd ..
   ```

3. **Frontend Setup (Client)**:
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Configuration**:
   - Create `.env` in server/ for database URL, JWT secret, etc. (e.g., `SECRET_KEY=your_secret`, `DATABASE_URL=sqlite:///coursehub.db`)

5. **Run the Application**:
   - Backend: `cd server && source venv/bin/activate && python app.py` (runs on http://localhost:5000)
   - Frontend: `cd client && npm start` (runs on http://localhost:3000, proxies to backend)

## How to Use

### Starting the Application

- Start backend: `cd server && python app.py`
- Start frontend: `cd client && npm start`
- Access the app at http://localhost:3000

### Key Features Usage

- **Authentication**: Navigate to /login or /signup for user management
- **Dashboard**: View statistics after login at /dashboard
- **CRUD Operations**: Use protected routes for managing courses, students, and enrollments via API endpoints (e.g., /api/courses)

### API Endpoints

- POST /api/auth/login - User login
- POST /api/auth/signup - User registration
- GET /api/courses - List courses (authenticated)
- POST /api/courses - Create course
- Similar for /students, /enrollments

All protected routes require JWT in Authorization header.

## Module Structure

### server/app.py

Main Flask application with:

- Route definitions
- Authentication middleware
- CORS configuration
- Database initialization

### server/authentication.py

Handles:

- Login/signup routes
- JWT token generation/validation
- Password hashing with bcrypt

### client/src/App.js

Frontend entry with:

- React Router for navigation (login, signup, dashboard)
- Navbar component with auth state
- Protected routes

### client/src/api.js

API client with:

- Axios configuration
- Auth header injection
- Endpoint methods for CRUD

## Database Schema

### Key Tables (SQLite)

**Users Table**  
id, username, email, password_hash, role  
(Used for authentication)

**Courses Table**  
id, title, description, instructor, duration  
Relationships with Enrollments

**Students Table**  
id, name, email, student_id, enrollment_date  
Relationships with Enrollments

**Enrollments Table**  
id, student_id, course_id, status, grade  
Relationships with Students and Courses

## API Reference

### Authentication Endpoints (server/authentication.py)

- POST /api/auth/login - Returns JWT token
- POST /api/auth/signup - Creates user
- POST /api/auth/logout - Invalidates token (client-side)

### CRUD Endpoints (server/resources.py)

- GET/POST/PUT/DELETE /api/courses - Course management
- GET/POST/PUT/DELETE /api/students - Student management
- GET/POST/PUT/DELETE /api/enrollments - Enrollment management

All require Authorization: Bearer <token>

## Development

### Running Tests

```bash
# Frontend
cd client && npm test

# Backend (if pytest configured)
cd server && pytest
```

### Code Structure

```javascript
// Frontend example
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
```

```python
# Backend example
from flask import Flask, request
from authentication import token_required
@app.route('/api/courses', methods=['GET'])
@token_required
def get_courses():
    # Implementation
```

### Adding New Features

- Add React components in client/src/components/
- Implement backend routes in server/resources.py
- Update database schema and migrate
- Add tests and run them
- Style with monochromatic theme in index.css

## Common Issues and Solutions

### CORS or Proxy Issues

- Ensure backend runs on port 5000
- Frontend proxy in package.json: "proxy": "http://localhost:5000"

### Authentication Errors

- Check JWT secret in config.py
- Verify token expiration and refresh logic

### Database Connection

```bash
# Reset database
rm coursehub.db
# Restart backend to recreate tables
```

### Dependency Issues

```bash
# Frontend
cd client && rm -rf node_modules && npm install

# Backend
cd server && rm -rf venv && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt
```

## Support and Contact Details

If you have any questions, suggestions, or need assistance, please contact:

GitHub: @JamesKamau-5773
      : @alexmwangi

## License

MIT License - See LICENSE file for details.

If you find this project useful, please give it a star on GitHub!
