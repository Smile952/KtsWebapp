import '../../../css/styles/Header.css'
import '../../../css/bootstrapCss/bootstrap.min.css'
import React from 'react'
export function Header({ text }) {
    return (
            <div className='container'>
                <div className='d-flex justify-content-between align-items-center content'>
                    <div className='title'>{text[0]}</div>
                    <div>
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
            </div>
    )
}