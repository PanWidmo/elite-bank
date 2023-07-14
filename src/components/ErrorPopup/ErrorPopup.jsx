import PropTypes from 'prop-types';
import styles from '@/components/ErrorPopup/ErrorPopup.module.scss';

export const ErrorPopup = ({ msg = 'Something went wrong.' }) => {
    return (
        <div className={styles.errorPopup}>
            <h2 className={styles.errorPopup__title}>Oops!</h2>
            <p className={styles.errorPopup__description}>{msg}</p>
        </div>
    );
};

ErrorPopup.propTypes = {
    msg: PropTypes.string,
};
