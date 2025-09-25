import React, { useState, useEffect } from 'react';
import { getCourses, createCourse } from '../../api';
import CourseForm from '../CourseForm';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

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
            {courses.map((course) => (
              <li key={course.id}>{course.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Courses;
