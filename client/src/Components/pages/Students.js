import React, { useState, useEffect } from 'react';
import { useSearch } from '../../contexts/SearchContext';
import { getStudents, createStudent } from '../../api';
import StudentForm from '../StudentForm';

const Students = () => {
  const { searchTerm, searchType } = useSearch();
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = searchType === 'student' ? students.filter(student => {
    const term = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term) ||
      student.student_id.toLowerCase().includes(term)
    );
  }) : students;

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
    <div className="container">
      <div className="card">
        <h2 style={{ background: 'linear-gradient(90deg, #9d4edd, #7b2cbf)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '700', marginBottom: '1rem' }}>Students</h2>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', fontSize: '18px', color: '#e5e5e5' }}>
            Loading...
          </div>
        ) : (
          <>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>Add Student</button>
            {showForm && (
              <StudentForm
                onSubmit={handleCreateStudent}
                onCancel={() => setShowForm(false)}
              />
            )}
            {filteredStudents.length > 0 ? (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Student ID</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.student_id}</td>
                        <td>{student.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: '#e5e5e5', textAlign: 'center', marginTop: '2rem' }}>No students available.</p>
            )}
            {searchTerm && searchType === 'student' && filteredStudents.length === 0 && (
              <p style={{ color: '#ff4d6d', textAlign: 'center' }}>No students found matching "{searchTerm}"</p>
            )}
            {searchTerm && searchType !== 'student' && (
              <p style={{ color: '#aaa', textAlign: 'center' }}>Search for {searchType}s on the {searchType}s page.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Students;

