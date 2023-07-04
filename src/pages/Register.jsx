import { RegisterForm } from '@/components/RegisterForm/RegisterForm.jsx';
import { routes } from '@/services/routes.jsx';
import { Link } from 'react-router-dom';

export const Register = () => {
    return (
        <>
            <h2>Register Account</h2>
            <RegisterForm />
            Already have an account? <Link to={routes.login}> Log In </Link>
        </>
    );
};
