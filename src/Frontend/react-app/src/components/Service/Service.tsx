import { useLocation } from 'react-router-dom';
import './Service.css';
import { links } from '../../common/Constants/links';

interface ServiceState {
    title: string;
    description: string;
    photo: string;
}

export function Service() {
    const { state } = useLocation();

    const serviceState = (state as ServiceState) || {
        title: '',
        description: '',
        photo: '',
    };

    return (
        <div className="block">
            <div className="block-group">
                <div className="back-block">
                    <div className="front-block">
                        <div className="block-text">
                            <div className="block-title">{serviceState.title}</div>
                            <div className="block-description">{serviceState.description}</div>
                            <div className="block-image">
                                <img className="block-image-source" src={serviceState.photo} alt='Сайт КТС' />
                            </div>
                        </div>
                    </div>
                </div>
                <a className="block-button" href={links['Заявка']}>
                    <div className="block-button-link-text">Создать данную заявку</div>
                </a>
                <a className="block-button" href={links['Главная']}>
                    <div className="block-button-link-text">Вернуться к списку услуг</div>
                </a>
            </div>
        </div>
    );
}
