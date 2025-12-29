import styles from  './Footer.module.css';

export function Footer() {
    return (
        <footer className={`g-body-tertiary text-center text-lg-start ${styles.footer}`}>
            <div className={styles.links}>
                <div className={styles.links_telegram}>
                    <div className={styles.FAQ}>
                        <a href="#">FAQ</a>
                    </div>
                    <div className={styles.telegram_bot}></div>
                </div>
            </div>
            <div className={`text-center p-3 ${styles.footer_content}`}>
                <p>© Права защищены Кунг-Фу пандой</p>
            </div>
        </footer>
    );
}
