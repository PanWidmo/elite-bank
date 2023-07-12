import styles from '@/components/AuthBox/AuthBox.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';

export const AuthBox = ({ title, description, link, linkText, children }) => {
    return (
        <div className={styles.authBox}>
            <Fade direction={'up'} triggerOnce>
                <h2 className={styles.authBox__title}>{title}</h2>
                {children}
                <div className={styles.authBox__infoWrapper}>
                    <p>{description}</p>
                    <Link to={link}> {linkText}</Link>
                </div>
            </Fade>
        </div>
    );
};

AuthBox.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    linkText: PropTypes.string,
    children: PropTypes.any,
};
