import { Route, Routes } from 'react-router-dom'
import './i18n';

import ProtectedRoutes from './components/ProtectedRoutes'
import LoginPage from './routes/LoginPage'
import RegisterPage from './routes/RegisterPage'
import PageLayout from './routes/PageLayout'
import AboutPage from './routes/AboutPage'
import HomePage from './routes/HomePage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoutes>
              <Route path="/" element={<PageLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
              </Route>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  )
}

export default App