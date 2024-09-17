import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAuth } from "../app/AuthProvider";
import ErrorsMessages from '../components/ErrorsMessages';

function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    rememberMe: false,
    messages: ['']
  }); 
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();

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
      <h3>{t('login_to_account')}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">{t('email_address')}</label>
        <br/>
        <input
          type="email"
          id="email"
          name="email"
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

        <label htmlFor="password">{t('password')}</label>
        <br/>
        <input
          type="password"
          id="password"
          name="password"
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
        <label htmlFor="rememberMe">{t('remember_me')}</label>
        <br/>

        <button type="submit">{t('login')}</button>
      </form>

      <ErrorsMessages messages={formValues.messages} />

      <p>
        {t('dont_have_account')} <Link to={'/register'}>{t('please_register')}</Link>
      </p>
    </section>
  )
}

export default LoginPage