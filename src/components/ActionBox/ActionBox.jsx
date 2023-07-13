import PropTypes from 'prop-types';
import styles from '@/components/ActionBox/ActionBox.module.scss';

export const ActionBox = ({ title, children }) => {
    return (
        <div className={styles.actionBox}>
            <h3 className={styles.actionBox__title}>{title}</h3>
            {children}
        </div>
    );
};

ActionBox.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
};
