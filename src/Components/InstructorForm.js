import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const InstructorForm = ({ onSubmit, onCancel, initialValues = {} }) => {
    const formik = useFormik({
        initialValues: {
            email: initialValues.email || "",
            name: initialValues.name || "",
            specialty: initialValues.specialty || ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            name: Yup.string().required("Required"),
            specialty: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="card" style={{ marginTop: "1rem" }}>
            <h3 style={{ background: 'linear-gradient(90deg, #9d4edd, #7b2cbf)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '700', marginBottom: '1rem' }}>
                {initialValues.id ? 'Edit Instructor' : 'Add New Instructor'}
            </h3>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    {...formik.getFieldProps("email")}
                    />
                {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}
            </div>

            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    {...formik.getFieldProps("name")}
                    />
                {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}
            </div>

            <div className="form-group">
                <label>Specialty</label>
                <input
                    type="text"
                    name="specialty"
                    className="form-control"
                    {...formik.getFieldProps("specialty")}
                    />
                {formik.touched.specialty && formik.errors.specialty && <div className="error">{formik.errors.specialty}</div>}
            </div>

            <button type="submit" className="btn btn-success">
                {initialValues.id ? 'Update Instructor' : 'Create Instructor'}
            </button>
            {onCancel && (
                <button type="button" className="btn btn-secondary" onClick={onCancel} style={{ marginLeft: "0.5rem" }}>Cancel</button>
            )}
        </form>
    );
};

export default InstructorForm;
