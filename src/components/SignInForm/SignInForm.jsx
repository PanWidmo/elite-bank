import styles from '@/components/SignInForm/SignInForm.module.scss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserAuth } from '@/context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup.string().required('Value is required.'),
    password: yup.string().required('Value is required.'),
});

export const SignInForm = () => {
    const { signIn } = UserAuth();
    const navigate = useNavigate();

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
            navigate('/account');
        } catch ({ message }) {
            console.error(`ERROR: ${message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" {...register('email')} />
            {errors.email?.message && <span>{errors.email?.message}</span>}
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" {...register('password')} />
            {errors.password?.message && <span>{errors.password?.message}</span>}
            <button type="submit">Sign In</button>
        </form>
    );
};
