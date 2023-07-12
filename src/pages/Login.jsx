import { LoginForm } from '@/components/LoginForm/LoginForm.jsx';
import { AuthBox } from '@/components/AuthBox/AuthBox.jsx';
import { routes } from '@/services/routes.jsx';

export const Login = () => {
    return (
        <AuthBox title="Login" description="Need an account?" link={routes.register} linkText="Register Account">
            <LoginForm />
        </AuthBox>
    );
};
