import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
      <h3>{t('register_account')}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">{t('first_name')}</label>
        <br/>
        <input
          type="text"
          id="firstName"
          name="firstName"
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

        <label htmlFor="lastName">{t('last_name')}</label>
        <br/>
        <input
          type="text"
          id="lastName"
          name="lastName"
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

        <label htmlFor="confirmPassword">{t('confirm_password')}</label>
        <br/>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
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

        <label htmlFor="description">{t('description')}</label>
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

        <button type="submit">{t('register')}</button>
      </form>

      <ErrorsMessages messages={formResult.messages} />

      <p>
        {t('already_have_account')} <Link to={'/login'}>{t('please_login')}</Link>
      </p>
    </section>
  )
}

export default RegisterPage