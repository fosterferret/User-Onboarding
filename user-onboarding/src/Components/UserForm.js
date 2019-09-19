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
      <h1>Login Form</h1>

      {touched.name && errors.name && <p> {errors.name}</p>}
      <Field type="name" name="name" placeholder="Name" />

      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="email" name="email" placeholder="Email" />

      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type="password" name="password" placeholder="Password" />


      <label>
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

