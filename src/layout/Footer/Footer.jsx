import styles from '@/layout/Footer/Footer.module.scss';

export const Footer = () => {
    const currYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__main}>
                <div className={styles.footer__content}>
                    <p>tomaszbaranww, Copyright &copy; {currYear}</p>
                </div>
            </div>
        </footer>
    );
};
