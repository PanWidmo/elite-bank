import PropTypes from 'prop-types';
import styles from '@/components/ErrorPopup/ErrorPopup.module.scss';
import { BiError } from 'react-icons/bi';

export const ErrorPopup = ({ msg = 'Something went wrong.' }) => {
    return (
        <div className={styles.errorPopup}>
            <h2 className={styles.errorPopup__title}>
                <BiError /> Oops!
            </h2>
            <p className={styles.errorPopup__description}>{msg}</p>
        </div>
    );
};

ErrorPopup.propTypes = {
    msg: PropTypes.string,
};
