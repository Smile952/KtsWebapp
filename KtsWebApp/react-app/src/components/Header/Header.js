import './Header.css'

export function Header({ text }) {
    return (
        <header className='header'>
            <div className='d-flex content'>
                <div className='title'>{text[0]}</div>
                <div className='d-flex link-block'>
                    <ul className="nav">
                        <div>
                            <li className="nav-item"><a href="#" className="nav-link">{text[1]}</a></li>
                        </div>
                        <div>
                            <li className="nav-item"><a href="#" className="nav-link">{text[2]}</a></li>
                        </div>
                        <div>
                            <li className="nav-item"><a href="#" className="nav-link">{text[3]}</a></li>
                        </div>
                        <div>
                            <li className="nav-item"><a href="#" className="nav-link">{text[4]}</a></li>
                        </div>
                    </ul>
                </div>
            </div>
        </header>
    )
}