import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAuth } from "../app/AuthProvider";
import ErrorsMessages from '../components/ErrorsMessages';
import AuthLayout from './AuthLayout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AppSpinner from '../components/AppSpinner';
import { setPath } from '../utils/navigationUtils';

function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    rememberMe: false,
    messages: ['']
  }); 

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    login(formValues.email, formValues.password, formValues.rememberMe)
      .then(result => {
        setLoading(false);
        
        if (result.succeeded) {
          navigate(state?.path || setPath('/'));
        } else {
          setFormValues({
            ...formValues,
            messages: result.messages
          });
        }
      });
  }

  return (
    <AuthLayout>
      <div className="auth-form w-100 m-auto">
        <h3 className='mb-3'>{t('login_to_account')}</h3>

        <Form onSubmit={handleSubmit}>
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

          <Form.Group className="mb-3" controlId="rememberMe">
            <Form.Check
              type="checkbox"
              label={t('remember_me')}
              checked={formValues.rememberMe}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  rememberMe: e.target.checked
                });
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 py-2">{t('login')}</Button>
        </Form>

        <ErrorsMessages messages={formValues.messages} />

        <p className="mt-4 text-body-secondary text-center">
          {t('dont_have_account')} <Link className="fw-semibold text-decoration-none" to={setPath('/register')}>{t('please_register')}</Link>
        </p>
      </div>
      <AppSpinner show={loading} />
    </AuthLayout>
  )
}

export default LoginPage