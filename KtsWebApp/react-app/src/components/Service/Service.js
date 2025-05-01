import { useLocation } from 'react-router-dom'
import './Block.css'

export function Block() {
    const { state } = useLocation();

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
                <div className='block-button'>
                    <a className='block-button-link' href='/devTypes'>
                        <div className='block-button-link-text'>Back to нищая жизнь</div>
                    </a>
                </div>
            </div>
        </div>
    );
}