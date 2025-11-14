import styles from './Header.module.css';
import { links } from '../../common/links';
import { Account } from 'components/Account/Account';


export function Header({title, text }: {title:string, text: string[] }) {
    
    var navTexts = Array.isArray(text) ? text : [];
    
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
                        <Account/>        
                    </ul>
                </div>
            </div>
        </header>
    );
}
