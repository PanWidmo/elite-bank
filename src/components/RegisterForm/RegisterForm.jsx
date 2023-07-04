import styles from '@/components/RegisterForm/RegisterForm.module.scss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/services/routes.jsx';
import { FormField } from '@/components/FormField/FormField.jsx';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth.jsx';

const schema = yup.object().shape({
    email: yup.string().required('Value is required.'),
    password: yup.string().required('Value is required.').min(6, 'Password should be at least 6 characters'),
    password_confirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
});

export const RegisterForm = () => {
    const { createUser } = useAuth();
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
            await createUser(data.email, data.password);
            navigate(routes.dashboard, { replace: true });
        } catch ({ message }) {
            setError(message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <FormField label="Email" id="email" name="email" type="email" register={register} error={errors.email?.message} />
            <FormField label="Password" id="password" name="password" type="password" register={register} error={errors.password?.message} />
            <FormField
                label="Password Confirmation"
                id="password_confirm"
                name="password_confirm"
                type="password"
                register={register}
                error={errors.password_confirm?.message}
            />

            <button type="submit">Register</button>
            {error}
        </form>
    );
};
