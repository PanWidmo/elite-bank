import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ActionBox } from '@/components/ActionBox/ActionBox.jsx';
import { ActionForm } from '@/components/ActionForm/ActionForm.jsx';
import { ActionFormField } from '@/components/ActionFormField/ActionFormField.jsx';
import { useForm } from 'react-hook-form';
import { useDatabase } from '@/hooks/useDatabase.jsx';

const schema = yup.object().shape({
    transfer_to: yup.string().required('Value is required.'),
    amount: yup.string().required('Value is required.').min(1, 'Value must be greater than or equal to 1'),
});

export const TransferMoney = () => {
    const { transferMoney } = useDatabase();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        shouldUnregister: true,
        defaultValues: {
            transfer_to: '',
            amount: 0,
        },
    });

    const onSubmit = async (data) => {
        try {
            await transferMoney(data.transfer_to, Number(data.amount));
            reset();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <ActionBox title="Transfer money">
            <ActionForm onSubmit={handleSubmit(onSubmit)}>
                <ActionFormField
                    label="Transfer to"
                    id="transfer_to"
                    name="transfer_to"
                    type="email"
                    placeholder="Email"
                    register={register}
                    error={errors.transfer_to?.message}
                />
                <ActionFormField label="Amount" id="amount" name="amount" type="number" min="1" register={register} error={errors.amount?.message} />
            </ActionForm>
        </ActionBox>
    );
};
