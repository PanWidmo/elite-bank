import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FormField } from '@/components/FormField/FormField.jsx';
import { routes } from '@/services/routes.jsx';
import PropTypes from 'prop-types';
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
            <FormField label="Email" id="email" name="email" type="email" register={register} error={errors.email?.message} />
            <FormField label="Password" id="password" name="password" type="password" register={register} error={errors.password?.message} />

            {error}
        </AuthForm>
    );
};

LoginForm.propTypes = {
    children: PropTypes.any,
};
