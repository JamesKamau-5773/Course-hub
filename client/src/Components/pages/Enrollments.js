import React, { useState, useEffect } from 'react';
import { getEnrollments, createEnrollment } from '../../api';
import EnrollmentForm from '../EnrollmentForm';

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    setLoading(true);
    try {
      const data = await getEnrollments();
      setEnrollments(data);
    } catch (error) {
      alert('Error loading enrollments: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEnrollment = async (enrollmentData) => {
    try {
      await createEnrollment(enrollmentData);
      setShowForm(false);
      loadEnrollments();
      alert('Enrollment created successfully!');
    } catch (error) {
      alert('Error creating enrollment: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Enrollments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={() => setShowForm(true)}>Add Enrollment</button>
          {showForm && (
            <EnrollmentForm
              onSubmit={handleCreateEnrollment}
              onCancel={() => setShowForm(false)}
            />
          )}
          <ul>
            {enrollments.map((enrollment) => (
              <li key={enrollment.id}>Student {enrollment.student_id} in Course {enrollment.course_id}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Enrollments;
