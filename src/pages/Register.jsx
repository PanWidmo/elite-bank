import { RegisterForm } from '@/components/RegisterForm/RegisterForm.jsx';
import { routes } from '@/services/routes.jsx';
import { AuthBox } from '@/components/AuthBox/AuthBox.jsx';

export const Register = () => {
    return (
        <AuthBox title="Register" description="Already have an account?" link={routes.login} linkText="Log In">
            <RegisterForm />
        </AuthBox>
    );
};
