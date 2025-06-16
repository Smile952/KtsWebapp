import './Header.css';
import { links } from '../../common/links';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/authSlice';

interface HeaderProps {
    text: string[];  // ожидаем массив строк
}

export function Header({ text }: HeaderProps) {
    const title = text[0] || '';
    const user = useSelector(userSelector)
    var navTexts = Array.isArray(text) ? text : [];
    if (user) {
        navTexts = navTexts.slice(1, navTexts.length - 1)
    }
    const navLinks = navTexts
        .filter(linkText => linkText)
        .map((linkText, index) => (
            <li className="nav-item" key={index}>
                <a href={links[linkText]} className="nav-link">
                    {linkText}
                </a>
            </li>
        ));
    return (
        <header className="header">
            <div className="d-flex content">
                <div className="title">{title}</div>
                <div className="d-flex link-block">
                    <ul className="nav">
                        {navLinks}
                        <li>
                            <a href='*' className='nav-link'>
                                {user?.name}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
