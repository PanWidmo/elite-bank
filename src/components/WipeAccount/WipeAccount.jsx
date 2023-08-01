import { ActionBox } from '@/components/ActionBox/ActionBox.jsx';
import { ActionForm } from '@/components/ActionForm/ActionForm.jsx';
import { ActionFormField } from '@/components/ActionFormField/ActionFormField.jsx';
import { ErrorPopup } from '@/components/ErrorPopup/ErrorPopup.jsx';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDatabase } from '@/hooks/useDatabase.jsx';

const schema = yup.object().shape({
    user_wipe: yup.string().required('Value is required.'),
    pin_wipe: yup
        .number()
        .test('len', 'Value must be exactly 4 characters', (val) => val.toString().length === 4)
        .transform((value) => (isNaN(value) ? 0 : value)),
});

export const WipeAccount = () => {
    const [error, setError] = useState('');
    const { userData, wipeAccount, userBalance } = useDatabase();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        shouldUnregister: true,
        defaultValues: {
            user_wipe: '',
            pin_wipe: '',
        },
    });

    const onSubmit = async ({ user_wipe, pin_wipe }) => {
        try {
            if (userBalance <= 0) {
                throw new Error(`You don't have money to wipe`);
            } else if (Number(pin_wipe) !== userData?.pin || user_wipe !== userData?.email) {
                throw new Error('Credentials are incorrect');
            } else {
                await wipeAccount(user_wipe);
                reset();
            }
        } catch ({ message }) {
            setError(message);
            console.error(message);
        }
    };

    return (
        <>
            <ActionBox title="Wipe account" type="close">
                <ActionForm onSubmit={handleSubmit(onSubmit)}>
                    <ActionFormField
                        label="Confirm user"
                        id="user_wipe"
                        name="user_wipe"
                        type="text"
                        placeholder="Email"
                        register={register}
                        error={errors.user_wipe?.message}
                    />

                    <ActionFormField
                        label="Confirm PIN"
                        id="pin_wipe"
                        name="pin_wipe"
                        type="number"
                        placeholder="Value"
                        register={register}
                        error={errors.pin_wipe?.message}
                    />
                </ActionForm>
                {error && <ErrorPopup msg={error} />}
            </ActionBox>
        </>
    );
};
