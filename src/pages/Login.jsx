import { LoginForm } from '@/components/LoginForm/LoginForm.jsx';
import { Link } from 'react-router-dom';
import { routes } from '@/services/routes.jsx';

export const Login = () => {
    return (
        <>
            <h2>Log in</h2>
            <LoginForm />
            Need an account? <Link to={routes.register}> Register Account</Link>
        </>
    );
};
