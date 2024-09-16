import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../app/AuthProvider";
import ErrorsMessages from '../components/ErrorsMessages';

function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: 'john.doe@mail.com',
    password: '123',
    rememberMe: false,
    messages: ['']
  }); 
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await login(formValues.email, formValues.password, formValues.rememberMe);
    if (result.succeeded) {
      navigate(state?.path || "/");
    } else {
      setFormValues({
        ...formValues,
        messages: result.messages
      });
    }
  }

  return (
    <section>
      <h3>Please log in:</h3>
      <form onSubmit={handleSubmit}>
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

        <input 
          type="checkbox" 
          id="rememberMe" 
          name="rememberMe"
          checked={formValues.rememberMe}
          onChange={(e) => {
            setFormValues({
              ...formValues,
              rememberMe: e.target.checked
            });
          }}
        />
        <label htmlFor="rememberMe">Remember me</label>
        <br/>

        <button type="submit">Log in</button>
      </form>

      <ErrorsMessages messages={formValues.messages} />

      <p>
        Do not have an account? <Link to={'/register'}>Please register.</Link>
      </p>
    </section>
  )
}

export default LoginPage