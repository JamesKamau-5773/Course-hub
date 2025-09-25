const API_URL = 'http://localhost:5555/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Simple fetch helper with authentication
const fetchData = async (endpoint, options = {}) => {
  const token = getToken();
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        throw new Error('Authentication required');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

// Auth API
export const signup = (data) => fetchData('/auth/signup', {
  method: 'POST',
  body: JSON.stringify(data),
});

export const login = (data) => fetchData('/auth/login', {
  method: 'POST',
  body: JSON.stringify(data),
});

// Course API
export const getCourses = () => fetchData('/courses');
export const createCourse = (data) => fetchData('/courses', {
  method: 'POST',
  body: JSON.stringify(data),
});
export const updateCourse = (id, data) => fetchData(`/courses/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data),
});
export const deleteCourse = (id) => fetchData(`/courses/${id}`, {
  method: 'DELETE',
});

// Student API
export const getStudents = () => fetchData('/students');
export const getStudent = (id) => fetchData(`/students/${id}`);
export const createStudent = (data) => fetchData('/students', {
  method: 'POST',
  body: JSON.stringify(data),
});

// Enrollment API
export const getEnrollments = () => fetchData('/enrollments');
export const createEnrollment = (data) => fetchData('/enrollments', {
  method: 'POST',
  body: JSON.stringify(data),
});
export const updateEnrollment = (id, data) => fetchData(`/enrollments/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data),
});
export const deleteEnrollment = (id) => fetchData(`/enrollments/${id}`, {
  method: 'DELETE',
});
