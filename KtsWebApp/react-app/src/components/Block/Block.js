import { useLocation } from 'react-router-dom'
import './Block.css'

export function Block() {
    const { state } = useLocation()
    console.log(state.photo)
    return (
        <div className='block'>
            <div className='block-group'>
                <div className='back-block'>
                    <div className="front-block">
                        <div className='block-text'>
                            <div className="block-title">{state.title}</div>
                            <div className="block-description">{state.desription}</div>
                            <div className="block-image">
                                <img className="block-image-source" src={state.photo}></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='block-button btn btn-outline-success'>
                    <a className='block-button-link link-body-emphasis link-offset-2 link-underline-opacity-25 fw-bold' href='/'>
                        <div className='block-button-link-text'>Back to нищая жизнь</div>
                    </a>
                </div>
            </div >
        </div>
    )
}