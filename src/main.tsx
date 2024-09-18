import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';

import './i18n';

import AuthProvider from './app/AuthProvider'

import App from './App.tsx'
import './App.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </CookiesProvider>
  </StrictMode>,
)
