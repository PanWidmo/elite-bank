import styles from '@/components/ActionForm/ActionForm.module.scss';
import PropTypes from 'prop-types';
import { FiChevronsRight } from 'react-icons/fi';

export const ActionForm = ({ children, ...rest }) => {
    return (
        <form className={styles.actionForm} {...rest}>
            {children}
            <button className={styles.actionForm__button}>
                <FiChevronsRight />
            </button>
        </form>
    );
};

ActionForm.propTypes = {
    children: PropTypes.any,
    rest: PropTypes.any,
};
