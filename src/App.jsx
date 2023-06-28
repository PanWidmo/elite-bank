import '@/assets/styles/global.scss';
import { Header } from '@/layout/Header/Header';
import { Footer } from '@/layout/Footer/Footer';
import { SignUp } from '@/pages/SignUp.jsx';
import { AuthContextProvider } from '@/context/AuthContext.jsx';
import { SignIn } from '@/pages/SignIn.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Account } from '@/pages/Account.jsx';
import { ProtectedRoutes } from '@/components/ProtectedRoutes/ProtectedRoutes.jsx';

export const App = () => {
    return (
        <>
            <Header />
            <main>
                <AuthContextProvider>
                    <Routes>
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/*" element={<Navigate to="/" />} />
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/" element={<Navigate to="/account" />} />
                            <Route path="/account" element={<Account />} />
                        </Route>
                    </Routes>
                </AuthContextProvider>
            </main>
            <Footer />
        </>
    );
};
