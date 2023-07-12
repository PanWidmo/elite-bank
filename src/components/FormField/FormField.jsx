import PropTypes from 'prop-types';
import styles from '@/components/FormField/FormField.module.scss';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { AiTwotoneCalendar } from 'react-icons/ai';

export const FormField = ({ label, id, name, type, register, error, ...rest }) => {
    return (
        <div className={styles.formField__wrapper}>
            <label className={styles.formField__label} htmlFor={id}>
                {label}
            </label>
            <div className={styles.formField__innerWrapper}>
                {type === 'email' && <HiOutlineMail className={styles.formField__icon} />}
                {type === 'password' && <HiOutlineLockClosed className={styles.formField__icon} />}
                {type === 'text' && <AiOutlineUser className={styles.formField__icon} />}
                {type === 'text' && <AiOutlineUser className={styles.formField__icon} />}
                {type === 'number' && <AiTwotoneCalendar className={styles.formField__icon} />}

                <input
                    className={styles.formField__input}
                    placeholder={`Enter ${label}`}
                    type={type}
                    name={name}
                    id={id}
                    {...register(name)}
                    {...rest}
                />
            </div>

            {error && <span className={styles.formField__error}>{error}</span>}
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    register: PropTypes.func,
    error: PropTypes.string,
};
