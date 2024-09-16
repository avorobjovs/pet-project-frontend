import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';

import AuthProvider from './app/AuthProvider'

import App from './App.tsx'
//import './index.css'

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
