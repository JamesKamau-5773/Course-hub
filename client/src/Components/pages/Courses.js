import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../contexts/SearchContext';
import { getCourses, createCourse } from '../../api';
import CourseForm from '../CourseForm';

const Courses = () => {
  const navigate = useNavigate();
  const { searchTerm } = useSearch();
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const term = searchTerm.toLowerCase();
    return (
      course.title.toLowerCase().includes(term) ||
      course.course_code.toLowerCase().includes(term) ||
      course.description.toLowerCase().includes(term) ||
      (course.instructor && course.instructor.name.toLowerCase().includes(term))
    );
  });

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      alert('Error loading courses: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (courseData) => {
    try {
      await createCourse(courseData);
      setShowForm(false);
      loadCourses();
      alert('Course created successfully!');
    } catch (error) {
      alert('Error creating course: ' + error.message);
    }
  };

  return (
    <div>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      <h2>Courses</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={() => setShowForm(true)}>Add Course</button>
          {showForm && (
            <CourseForm
              onSubmit={handleCreateCourse}
              onCancel={() => setShowForm(false)}
            />
          )}
          <ul>
            {filteredCourses.map((course) => (
              <li key={course.id}>
                {course.title} ({course.course_code}) - Instructor: {course.instructor ? course.instructor.name : 'N/A'} - {course.description}
              </li>
            ))}
          </ul>
          {searchTerm && filteredCourses.length === 0 && (
            <p>No courses found matching "{searchTerm}"</p>
          )}
        </>
      )}
    </div>
  );
};

export default Courses;
