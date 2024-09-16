import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../app/AuthProvider';
import ErrorsMessages from '../components/ErrorsMessages';

function RegisterPage() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    description: ''
  }); 

  const [formResult, setFormResult] = useState({
    succeeded: false,
    messages: ['']
  }); 

  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await register(
      formValues.firstName,
      formValues.lastName,
      formValues.email,
      formValues.password,
      formValues.confirmPassword,
      formValues.description
    );
    if (result.succeeded) {
      setFormResult({
        succeeded: true,
        messages: ['You have successfully registered. Please login.']
      });
    } else {
      setFormResult({
        succeeded: false,
        messages: result.messages
      });
    }
  }

  return (
    <section>
      <h3>Register new user:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <br/>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          required
          value={formValues.firstName}
          onChange={(e) => {
            setFormValues({
              ...formValues,
              firstName: e.target.value
            });
          }}
        />
        <br/>

        <label htmlFor="lastName">Last Name:</label>
        <br/>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          required
          value={formValues.lastName}
          onChange={(e) => {
            setFormValues({
              ...formValues,
              lastName: e.target.value
            });
          }}
        />
        <br/>

        <label htmlFor="email">Email:</label>
        <br/>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          maxLength={256}
          value={formValues.email}
          onChange={(e) => {
            setFormValues({
              ...formValues,
              email: e.target.value
            });
          }}
        />
        <br/>

        <label htmlFor="password">Password:</label>
        <br/>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          value={formValues.password}
          onChange={(e) => {
            setFormValues({
              ...formValues,
              password: e.target.value
            });
          }}
        />
        <br/>

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <br/>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={formValues.confirmPassword}
          onChange={(e) => {
            setFormValues({
              ...formValues,
              confirmPassword: e.target.value
            });
          }}
        />
        <br/>

        <label htmlFor="description">Description:</label>
        <br/>
        <textarea 
          id="description"
          name="description"
          value={formValues.description}
          onChange={(e) => {
            setFormValues({
              ...formValues,
              description: e.target.value
            });
          }}
        />
        <br/>

        <button type="submit">Register</button>
      </form>

      <ErrorsMessages messages={formResult.messages} />

      <p>
        Already have an account? <Link to={'/login'}>Please login.</Link>
      </p>
    </section>
  )
}

export default RegisterPage