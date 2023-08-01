import PropTypes from 'prop-types';
import styles from '@/components/AuthFormField/AuthFormField.module.scss';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { BsKey } from 'react-icons/bs';

export const AuthFormField = ({ label, id, name, type, register, error }) => {
    return (
        <div className={styles.authFormField}>
            <label className={styles.authFormField__label} htmlFor={id}>
                {label}
            </label>
            <div className={styles.authFormField__innerWrapper}>
                {type === 'email' && <HiOutlineMail className={styles.authFormField__icon} />}
                {type === 'password' && <HiOutlineLockClosed className={styles.authFormField__icon} />}
                {type === 'text' && <AiOutlineUser className={styles.authFormField__icon} />}
                {name === 'age' && <AiTwotoneCalendar className={styles.authFormField__icon} />}
                {name === 'pin' && <BsKey className={styles.authFormField__icon} />}

                <input className={styles.authFormField__input} placeholder={`Enter ${label}`} type={type} name={name} id={id} {...register(name)} />
            </div>

            {error && <span className={styles.authFormField__error}>*{error}</span>}
        </div>
    );
};

AuthFormField.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    register: PropTypes.func,
    error: PropTypes.string,
};
