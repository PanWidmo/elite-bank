import styles from '@/components/Footer/Footer.module.scss';

export const Footer = () => {
    const today = new Date();

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__main}>
                <div className={styles.footer__content}>
                    <p>PanWidmo, Copyright &copy; {today.getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
};
