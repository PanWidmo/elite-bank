import '@/assets/styles/global.scss';
import { Header } from '@/layout/Header/Header';
import { Footer } from '@/layout/Footer/Footer';
import { Register } from '@/pages/Register.jsx';
import { AuthContextProvider } from '@/context/AuthContext.jsx';
import { Login } from '@/pages/Login.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '@/pages/Dashboard.jsx';
import { ProtectedRoutes } from '@/services/ProtectedRoutes/ProtectedRoutes.jsx';
import { routes } from '@/services/routes.jsx';

export const App = () => {
    return (
        <>
            <Header />
            <main>
                <AuthContextProvider>
                    <Routes>
                        {/* Public routes */}
                        <Route path={routes.login} element={<Login />} />
                        <Route path={routes.register} element={<Register />} />
                        <Route path={routes.all} element={<Navigate to={routes.default} />} />
                        {/* Protected routes */}
                        <Route element={<ProtectedRoutes />}>
                            <Route path={routes.default} element={<Navigate to={routes.dashboard} />} />
                            <Route path={routes.dashboard} element={<Dashboard />} />
                        </Route>
                    </Routes>
                </AuthContextProvider>
            </main>
            <Footer />
        </>
    );
};
