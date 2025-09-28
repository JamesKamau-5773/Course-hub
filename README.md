# CourseHub

A full-stack web application for managing courses, students, and enrollments with user authentication.

## Features

- User authentication (Login/Signup)
- Dashboard with statistics overview
- Course management (CRUD operations)
- Student management (CRUD operations)
- Enrollment management (CRUD operations)
- Responsive design

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- CSS for styling

### Backend
- Node.js with Express.js
- SQLite database
- JWT for authentication
- bcryptjs for password hashing

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5555`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The client will run on `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Sign up for a new account or login if you already have one
3. Use the dashboard to navigate between different sections
4. Manage courses, students, and enrollments through the respective pages

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a new course
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student
- `POST /api/students` - Create a new student

### Enrollments
- `GET /api/enrollments` - Get all enrollments
- `POST /api/enrollments` - Create a new enrollment
- `PUT /api/enrollments/:id` - Update an enrollment
- `DELETE /api/enrollments/:id` - Delete an enrollment

## Database

The application uses SQLite with the following tables:
- `users` - User accounts
- `courses` - Course information
- `students` - Student information
- `enrollments` - Student-course relationships

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
