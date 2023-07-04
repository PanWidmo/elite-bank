import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { routes } from '@/services/routes.jsx';
import { useAuth } from '@/hooks/useAuth.jsx';

export const ProtectedRoutes = () => {
    const location = useLocation();
    const { currentUser } = useAuth();

    return currentUser ? <Outlet /> : <Navigate to={routes.login} state={{ from: location }} replace />;
};
