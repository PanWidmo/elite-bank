import styles from '@/components/ActionFormField/ActionFormField.module.scss';
import PropTypes from 'prop-types';

export const ActionFormField = ({ label, id, name, type, register, placeholder = 'Enter value', error }) => {
    return (
        <div className={styles.actionFormField}>
            <input className={styles.actionFormField__input} placeholder={placeholder} type={type} name={name} id={id} {...register(name)} />
            {error && <span className={styles.actionFormField__error}>*{error}</span>}

            <label className={styles.actionFormField__label} htmlFor={id}>
                {label}
            </label>
        </div>
    );
};

ActionFormField.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    register: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.string,
};
