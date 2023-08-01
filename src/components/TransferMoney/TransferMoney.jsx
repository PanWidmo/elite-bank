import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ActionBox } from '@/components/ActionBox/ActionBox.jsx';
import { ActionForm } from '@/components/ActionForm/ActionForm.jsx';
import { ActionFormField } from '@/components/ActionFormField/ActionFormField.jsx';
import { useForm } from 'react-hook-form';
import { useDatabase } from '@/hooks/useDatabase.jsx';
import { ErrorPopup } from '@/components/ErrorPopup/ErrorPopup.jsx';

const schema = yup.object().shape({
    user_transfer: yup.string().required('Value is required.'),
    amount_transfer: yup
        .number()
        .min(1, 'Value must be greater than or equal to 1')
        .transform((value) => (isNaN(value) ? 0 : value)),
});

export const TransferMoney = () => {
    const [error, setError] = useState('');
    const { userBalance, transferMoney } = useDatabase();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        shouldUnregister: true,
        defaultValues: {
            user_transfer: '',
            amount_transfer: '',
        },
    });

    const onSubmit = async ({ user_transfer, amount_transfer }) => {
        try {
            if (Number(amount_transfer) > userBalance) {
                throw new Error(`You don't have money to transfer`);
            } else {
                await transferMoney(user_transfer, Number(amount_transfer));
                reset();
            }
        } catch ({ message }) {
            setError(message);
            console.error(message);
        }
    };
    return (
        <ActionBox title="Transfer money" type="transfer">
            <ActionForm onSubmit={handleSubmit(onSubmit)}>
                <ActionFormField
                    label="Transfer to"
                    id="user_transfer"
                    name="user_transfer"
                    type="email"
                    placeholder="Email"
                    register={register}
                    error={errors.user_transfer?.message}
                />
                <ActionFormField
                    label="Amount"
                    id="amount_transfer"
                    name="amount_transfer"
                    type="number"
                    placeholder="Value"
                    register={register}
                    error={errors.amount_transfer?.message}
                />
            </ActionForm>
            {error && <ErrorPopup msg={error} />}
        </ActionBox>
    );
};
