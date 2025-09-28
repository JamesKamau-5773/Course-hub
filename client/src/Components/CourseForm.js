import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CourseForm = ({ onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ marginTop: "1rem", padding: "1rem", background: "#f8f9fa", borderRadius: "4px" }}>
      <h3>Add New Course</h3>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          {...formik.getFieldProps("title")}
        />
        {formik.touched.title && formik.errors.title && <div className="error">{formik.errors.title}</div>}
      </div>

      <button type="submit" className="btn btn-success">Create Course</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel} style={{ marginLeft: "0.5rem" }}>Cancel</button>
    </form>
  );
};

export default CourseForm;
