import { UserAuth } from '@/context/AuthContext.jsx';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
    const location = useLocation();
    const { currentUser } = UserAuth();

    return currentUser ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace />;
};
