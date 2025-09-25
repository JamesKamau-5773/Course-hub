import React, { useState, useEffect } from 'react';
import { getStudents, createStudent } from '../../api';
import StudentForm from '../StudentForm';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      alert('Error loading students: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async (studentData) => {
    try {
      await createStudent(studentData);
      setShowForm(false);
      loadStudents();
      alert('Student created successfully!');
    } catch (error) {
      alert('Error creating student: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Students</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={() => setShowForm(true)}>Add Student</button>
          {showForm && (
            <StudentForm
              onSubmit={handleCreateStudent}
              onCancel={() => setShowForm(false)}
            />
          )}
          <ul>
            {students.map((student) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Students;

