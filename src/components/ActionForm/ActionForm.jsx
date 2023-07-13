import styles from '@/components/ActionForm/ActionForm.module.scss';
import PropTypes from 'prop-types';
import { AiOutlineSend } from 'react-icons/ai';

export const ActionForm = ({ children, ...rest }) => {
    return (
        <form className={styles.actionForm} {...rest}>
            {children}
            <button className={styles.actionForm__button}>
                <AiOutlineSend />
            </button>
        </form>
    );
};

ActionForm.propTypes = {
    children: PropTypes.any,
    rest: PropTypes.any,
};
