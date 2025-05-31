import './Header.css'
import { links } from '../../common/links';
export function Header({ text }) {
    const title = text[0] || '';

    text = Array.isArray(text) ? text.slice(1, 5) : [];
    var id = -1
    const navItems = text.map((linkText) => {
        if (!linkText) return null;
        id += 1
        return (
            <div key={id}>
                <li className="nav-item">
                    <a href={links[linkText]}
                        className="nav-link"
                    >
                        {linkText}
                    </a>
                </li>
            </div>
        );
    });
    return (
        <header className='header'>
            <div className='d-flex content'>
                <div className='title'>{title}</div>
                <div className='d-flex link-block'>
                    <ul className="nav">
                        {navItems}
                    </ul>
                </div>
            </div>
        </header>
    )
}

