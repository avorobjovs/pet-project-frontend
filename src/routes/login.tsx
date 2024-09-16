import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../app/AuthProvider";

function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: 'john.doe@mail.com',
    password: '123',
    rememberMe: false,
    errorMessage: ''
  }); 
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({
      ...formValues,
      email: e.target.value
    });
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({
      ...formValues,
      password: e.target.value
    });
  }

  function handleRememberMeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({
      ...formValues,
      rememberMe: e.target.checked
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginResult = await login(formValues.email, formValues.password, formValues.rememberMe);
    if (loginResult.isSuccess) {
      navigate(state?.path || "/");
    } else {
      setFormValues({
        ...formValues,
        errorMessage: loginResult.errorMessage
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
          value={formValues.email}
          onChange={handleEmailChange}
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
          onChange={handlePasswordChange}
        />
        <br/>
        <input 
          type="checkbox" 
          id="rememberMe" 
          name="rememberMe"
          checked={formValues.rememberMe}
          onChange={handleRememberMeChange}
        />
        <label htmlFor="rememberMe">Remember me</label>
        <br/>
        <button type="submit">Log in</button>
      </form>
      {formValues.errorMessage && (
        <p className="error">
          {formValues.errorMessage}
        </p>
      )}
    </section>
  )
}

export default LoginPage