import styles from '@/components/AuthForm/AuthForm.module.scss';
import PropTypes from 'prop-types';
import { BsArrowRight } from 'react-icons/bs';
export const AuthForm = ({ children, ...rest }) => {
    return (
        <form className={styles.authForm} {...rest}>
            {children}
            <button className={styles.authForm__button}>
                Submit <BsArrowRight className={styles.authForm__arrow} />
            </button>
        </form>
    );
};

AuthForm.propTypes = {
    children: PropTypes.any,
    props: PropTypes.any,
};
