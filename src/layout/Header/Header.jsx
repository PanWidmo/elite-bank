import styles from '@/layout/Header/Header.module.scss';
import { useAuth } from '@/hooks/useAuth.jsx';
import { routes } from '@/services/routes.jsx';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';

export const Header = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate(routes.login);
        } catch ({ message }) {
            console.error(message);
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__main}>
                <div className={styles.header__content}>
                    <h1>Elite Bank</h1>

                    {currentUser && <HiOutlineLogout tabIndex="0" className={styles.header__logout} onClick={handleLogout} />}
                </div>
            </div>
        </header>
    );
};
