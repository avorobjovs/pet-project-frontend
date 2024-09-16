import { Navigate, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../app/AuthProvider';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />
  }

  return (
    <Routes>
      {children}
    </Routes>
  );
}

export default ProtectedRoutes;