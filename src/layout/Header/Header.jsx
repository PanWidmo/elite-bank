import styles from '@/layout/Header/Header.module.scss';
export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__main}>
                <div className={styles.header__content}>
                    <h1>Elite Bank</h1>
                </div>
            </div>
        </header>
    );
};
