import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/services/routes.jsx';
import { AuthFormField } from '@/components/AuthFormField/AuthFormField.jsx';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth.jsx';
import { useDatabase } from '@/hooks/useDatabase.jsx';
import { AuthForm } from '@/components/AuthForm/AuthForm.jsx';

const schema = yup.object().shape({
    name: yup.string().required('Value is required.'),
    email: yup.string().required('Value is required.'),
    password: yup.string().required('Value is required.').min(6, 'Password should be at least 6 characters'),
    password_confirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
    age: yup.number().min(18, 'You must be an adult to create bank account'),
    pin: yup.number().test('len', 'Must be exactly 4 characters', (val) => val.toString().length === 4),
});

export const RegisterForm = () => {
    const { createUser } = useAuth();
    const { addUserToDb } = useDatabase();
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
            password_confirm: '',
            age: '',
            pin: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const {
                user: { uid },
            } = await createUser(data.email, data.password);
            await addUserToDb(uid, data);
            navigate(routes.dashboard, { replace: true });
        } catch ({ message }) {
            setError(message);
        }
    };

    return (
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
            <AuthFormField label="Name" id="name" name="name" type="text" register={register} error={errors.name?.message} />
            <AuthFormField label="Email" id="email" name="email" type="email" register={register} error={errors.email?.message} />
            <AuthFormField label="Password" id="password" name="password" type="password" register={register} error={errors.password?.message} />
            <AuthFormField
                label="Password Confirmation"
                id="password_confirm"
                name="password_confirm"
                type="password"
                register={register}
                error={errors.password_confirm?.message}
            />
            <AuthFormField label="Age" id="age" name="age" type="number" register={register} error={errors.age?.message} />
            <AuthFormField label="PIN" id="pin" name="pin" type="number" register={register} error={errors.pin?.message} />

            {error}
        </AuthForm>
    );
};
