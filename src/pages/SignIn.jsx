import { SignInForm } from '@/components/SignInForm/SignInForm.jsx';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
    const navigate = useNavigate();

    return (
        <>
            <h2>Sign In</h2>
            <SignInForm />
            <button onClick={() => navigate('/signup')}>Sign Up</button>
        </>
    );
};
