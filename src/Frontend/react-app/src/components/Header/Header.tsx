import './Header.css';
import { links } from '../../common/links';

interface HeaderProps {
    text: string[];  // ожидаем массив строк
}

export function Header({ text }: HeaderProps) {
    const title = text[0] || '';

    const navTexts = Array.isArray(text) ? text.slice(1, 5) : [];

    return (
        <header className="header">
            <div className="d-flex content">
                <div className="title">{title}</div>
                <div className="d-flex link-block">
                    <ul className="nav">
                        {navTexts.map((linkText, index) => {
                            if (!linkText) return null;
                            return (
                                <li className="nav-item" key={index}>
                                    <a href={links[linkText]} className="nav-link">
                                        {linkText}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </header>
    );
}
