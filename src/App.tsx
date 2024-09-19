import { Route, Routes } from 'react-router-dom'

import ProtectedRoutes from './components/ProtectedRoutes'
import LoginPage from './routes/LoginPage'
import RegisterPage from './routes/RegisterPage'
import PageLayout from './routes/PageLayout'
import AboutPage from './routes/AboutPage'
import HomePage from './routes/HomePage'
import { setPath } from './utils/navigationUtils'

function App() {
  return (
    <>
      <Routes>
        <Route path={setPath('/login')} element={<LoginPage />} />
        <Route path={setPath('/register')} element={<RegisterPage />} />
        <Route
          path={setPath('/*')}
          element={
            <ProtectedRoutes>
              <Route path={setPath('/')} element={<PageLayout />}>
                <Route index element={<HomePage />} />
                <Route path={setPath('/about')} element={<AboutPage />} />
              </Route>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  )
}

export default App