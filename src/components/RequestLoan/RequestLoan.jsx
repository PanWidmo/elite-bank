import { useState } from 'react';
import { ActionBox } from '@/components/ActionBox/ActionBox.jsx';
import { ActionForm } from '@/components/ActionForm/ActionForm.jsx';
import { ActionFormField } from '@/components/ActionFormField/ActionFormField.jsx';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ErrorPopup } from '@/components/ErrorPopup/ErrorPopup.jsx';
import { useDatabase } from '@/hooks/useDatabase.jsx';

const schema = yup.object().shape({
    amount_loan: yup
        .number()
        .min(1, 'Value must be greater than or equal to 1')
        .transform((value) => (isNaN(value) ? 0 : value)),
    pin_request: yup
        .number()
        .test('len', 'Value must be exactly 4 characters', (val) => val.toString().length === 4)
        .transform((value) => (isNaN(value) ? 0 : value)),
});

export const RequestLoan = () => {
    const [error, setError] = useState('');
    const { userData, requestLoan } = useDatabase();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        shouldUnregister: true,
        defaultValues: {
            amount_loan: '',
            pin_request: '',
        },
    });

    const onSubmit = async ({ amount_loan, pin_request }) => {
        try {
            if (Number(pin_request) !== userData?.pin) {
                throw new Error('PIN is incorrect');
            } else {
                await requestLoan(Number(amount_loan));
                reset();
            }
        } catch ({ message }) {
            setError(message);
        }
    };

    return (
        <>
            <ActionBox title="Request loan" type="request">
                <ActionForm onSubmit={handleSubmit(onSubmit)}>
                    <ActionFormField
                        label="Amount"
                        id="amount_loan"
                        name="amount_loan"
                        type="number"
                        placeholder="Value"
                        register={register}
                        error={errors.amount_loan?.message}
                    />
                    <ActionFormField
                        label="Confirm PIN"
                        id="pin_request"
                        name="pin_request"
                        type="number"
                        placeholder="Value"
                        register={register}
                        error={errors.pin_request?.message}
                    />
                </ActionForm>
                {error && <ErrorPopup msg={error} />}
            </ActionBox>
        </>
    );
};
