import styles from '@/components/MovementItem/MovementItem.module.scss';
import PropTypes from 'prop-types';

export const MovementItem = ({ movement, index }) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    return (
        <div className={styles.movementItem}>
            <div className={`${styles.movementItem__type} ${styles[`movementItem__${type}`]}`}>
                {index + 1} {type}
            </div>
            <div className={styles.movementItem__value}>{movement} €</div>
        </div>
    );
};

MovementItem.propTypes = {
    movement: PropTypes.number,
    index: PropTypes.number,
};
