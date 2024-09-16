import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'
import LoginPage from './routes/login'
import RegisterPage from './routes/register'
import PageLayout from './routes/layout'
import AboutPage from './routes/about'
import Index from './routes'

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
                <Route index element={<Index />} />
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