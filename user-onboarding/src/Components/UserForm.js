import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";

function UserForm({ values, errors, touched, isSubmitting, status }) {

  const [users, setUsers] = useState([])

  useEffect(() => {
    if (status) {
      setUsers([ ...users, status ])
    }
  }, [status])

  return (
    <>
    <Form className="form-container">
      <h1 id="logo">Login Form</h1>

      {touched.name && errors.name && <p> {errors.name}</p>}
      <Field type="name" name="name" placeholder="Name" />

      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="email" name="email" placeholder="Email" />

      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type="password" name="password" placeholder="Password" />


      <label class="tos">
        <Field className="checkbox" type="checkbox" name="tos" checked={values.tos} />
        <span>Accept Terms</span>
      </label>

      <button className="formButton" type="submit" disabled={isSubmitting}>Submit!</button>
    </Form>

    {users.map((user, index) => {
        return (
          <div key={index} index={index}>
            <h1>New User Info</h1>
            <h2>Name: {user.name}</h2>
            <h4>Email: {user.email}</h4>
          </div>
      ) })}
     </>
  );
}

export default withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required()
      .min(3,"Surely your name isn't that short?")
      .required("Your ame is required, dummy!"),
    email: Yup.string()
      .email("This is not a valid email")
      .required("An email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("A password is required"),
    tos: Yup.boolean().oneOf([ true ], "You must agree to the Terms of Service before proceeding")
  }),

  handleSubmit(values, { resetForm, setSubmitting, setStatus }) { 
    axios
    .post('https://reqres.in/api/users', values)
    .then(res => {
      setStatus(res.data)
      resetForm();
      setSubmitting(false);
    })
    .catch(err => {
      setSubmitting(false);
    });
}

})(UserForm);