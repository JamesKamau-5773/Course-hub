import React, {useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getStudents, getCourses } from "../api";

const EnrollmentForm = ({ onSubmit }) => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [studentsData, coursesData] = await Promise.all([getStudents(), getCourses()]);
            setStudents(studentsData);
            setCourses(coursesData);
        } catch (error) {
            alert("Error loading data");
        }
    };

    const formik = useFormik({
        initialValues: {
            student_id: '',
            course_id: '',
            semester: 'Fall 2024',
            grade: '',
            status: 'active',
        },
        validationSchema: Yup.object({
            student_id: Yup.number().required("Required"),
            course_id: Yup.number().required("Required"),
            semester: Yup.string().required("Required").matches(/^(Fall|Spring|Summer) \d{4}$/, 'Format: Season YYYY'),
        }),
        onSubmit: (values) => {
            onSubmit(values);
        },
    });
    
    return (
        <form onSubmit={formik.handleSubmit} className="card" style={{marginTop: '1rem'}}>
      <h3 style={{ background: 'linear-gradient(90deg, #9d4edd, #7b2cbf)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '700', marginBottom: '1rem' }}>Enroll Student in Course</h3>
      
      <div className="form-group">
        <label>Student</label>
        <select name="student_id" className="form-control" {...formik.getFieldProps('student_id')}>
          <option value="">Select a student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.username} ({student.student_id})
            </option>
          ))}
        </select>
        {formik.touched.student_id && formik.errors.student_id && <div className="error">{formik.errors.student_id}</div>}
      </div>


      <div className="form-group">
        <label>Course</label>
        <select name="course_id" className="form-control" {...formik.getFieldProps('course_id')}>
          <option value="">Select a course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.course_code}: {course.title}
            </option>
          ))}
        </select>
        {formik.touched.course_id && formik.errors.course_id && <div className="error">{formik.errors.course_id}</div>}
      </div>

           <div className="form-group">
        <label>Semester</label>
        <select name="semester" className="form-control" {...formik.getFieldProps('semester')}>
          <option value="Fall 2024">Fall 2024</option>
          <option value="Spring 2025">Spring 2025</option>
          <option value="Summer 2025">Summer 2025</option>
        </select>
      </div>

      <button type="submit" className="btn btn-success">Enroll Student</button>
    </form>
  );
};

export default EnrollmentForm;