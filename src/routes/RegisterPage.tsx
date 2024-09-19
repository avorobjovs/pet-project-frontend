import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../app/AuthProvider';
import ErrorsMessages from '../components/ErrorsMessages';
import AuthLayout from './AuthLayout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AppSpinner from '../components/AppSpinner';

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

  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    register(
      formValues.firstName,
      formValues.lastName,
      formValues.email,
      formValues.password,
      formValues.confirmPassword,
      formValues.description
    )
      .then(result => {
        setLoading(false);
        
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
      });
  }

  return (
    <AuthLayout>
      <div className="auth-form w-100 m-auto">
        <h3 className='mb-3'>{t('register_account')}</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>{t('first_name')}</Form.Label>
            <Form.Control 
              type="text"
              required 
              value={formValues.firstName}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  firstName: e.target.value
                });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>{t('last_name')}</Form.Label>
            <Form.Control 
              type="text"
              required 
              value={formValues.lastName}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  lastName: e.target.value
                });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>{t('email_address')}</Form.Label>
            <Form.Control 
              type="email"
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
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>{t('password')}</Form.Label>
            <Form.Control 
              type="password"
              required 
              value={formValues.password}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  password: e.target.value
                });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>{t('confirm_password')}</Form.Label>
            <Form.Control 
              type="password"
              required 
              value={formValues.confirmPassword}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  confirmPassword: e.target.value
                });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="description">
            <Form.Label>{t('description')}</Form.Label>
            <Form.Control 
              as="textarea"
              value={formValues.description}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  description: e.target.value
                });
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 py-2">{t('register')}</Button>
        </Form>

        <ErrorsMessages messages={formResult.messages} />

        <p className="mt-4 text-body-secondary text-center">
          {t('already_have_account')} <Link className="fw-semibold text-decoration-none" to={'/login'}>{t('please_login')}</Link>
        </p>
      </div>
      <AppSpinner show={loading} />
    </AuthLayout>
  )
}

export default RegisterPage