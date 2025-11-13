import styles from './Header.module.css';
import { links } from '../../common/links';
import { useState } from 'react';
import { LoginRegisterForm } from 'components/Authorization/LoginRegisterForm';


export function Header({title, text }: {title:string, text: string[] }) {
    const [user, setUser] = useState<{ name: string } | null>(null);
    var navTexts = Array.isArray(text) ? text : [];
    if (user) {
        navTexts = navTexts.slice(1, navTexts.length - 1);
    }
    const navLinks = navTexts
        .filter(linkText => linkText)
        .map((linkText, index) => (
            <li className={styles.nav_item} key={index}>
                <a href={links[linkText]} className={styles.nav_link}>
                    {linkText}
                </a>
            </li>
        ));
    return (
        <header className={styles.header}>
            <div className={`d-flex ${styles.content}`}>
                <div className={styles.title}>{title}</div>
                <div className={`d-flex ${styles.link_block}`}>
                    <ul className={styles.nav}>
                        {navLinks}
                        <li>
                            <a href='*' className={styles.nav_link}>
                                {user?.name}
                            </a>
                        </li>
                    </ul>
                    <LoginRegisterForm/>
                </div>
            </div>
        </header>
    );
}
