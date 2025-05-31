import { useLocation } from 'react-router-dom'
import './Service.css'
import { links } from '../../common/links';
import { useEffect, useState } from 'react'

export function Service() {
    const { state } = useLocation();
    const [isAuthorized, setIsAuthorized] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsAuthorized(true)
        }
    }, [])
    return (
        <div className='block'>
            <div className='block-group'>
                <div className='back-block'>
                    <div className="front-block">
                        <div className='block-text'>
                            <div className="block-title">{state.title}</div>
                            <div className="block-description">{state.description}</div>
                            <div className="block-image">
                                <img className="block-image-source" src={state.photo} alt={state.title} />
                            </div>
                        </div>
                    </div>
                </div>
                <a className='block-button' href={links['Заявка']}>
                    <div className='block-button-link-text'>Создать данную заявку</div>
                </a>
                <a className='block-button' href={links['Главная']}>
                    <div className='block-button-link-text'>Вернуться к списку услуг</div>
                </a>
            </div>
        </div>
    );
}