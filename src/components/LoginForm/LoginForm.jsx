import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthFormField } from '@/components/AuthFormField/AuthFormField.jsx';
import { routes } from '@/services/routes.jsx';
import { useAuth } from '@/hooks/useAuth.jsx';
import { AuthForm } from '@/components/AuthForm/AuthForm.jsx';

const schema = yup.object().shape({
    email: yup.string().required('Value is required.'),
    password: yup.string().required('Value is required.'),
});

export const LoginForm = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        shouldUnregister: true,
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            await signIn(data.email, data.password);
            navigate(routes.dashboard, { replace: true });
        } catch ({ message }) {
            setError(message);
        }
    };

    return (
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
            <AuthFormField label="Email" id="email" name="email" type="email" register={register} error={errors.email?.message} />
            <AuthFormField label="Password" id="password" name="password" type="password" register={register} error={errors.password?.message} />

            {error}
        </AuthForm>
    );
};
