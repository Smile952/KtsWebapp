import { useNavigate } from 'react-router-dom'
import styles from './Blocks.css'

export function Blocks() {
    const blocks = [
        { id: 1, title: 'Web Разработка', desription: 'Создание и разработка современных сайтов и приложений', photo: '/Images/WebDev/web-development.jpg' },
        { id: 2, title: 'Android/iOS', desription: 'Разработка приложений для iOS и Android', photo: '/Images/Mobile/android.jpg' },
        { id: 3, title: 'DevOps и облако', desription: 'Настройка инфраструктуры и автоматизация процессов', photo: '/Images/DevOps/devops.jpg' }
    ]

    const nav = useNavigate()

    const handler = (id, block) => {
        nav(`/about/${id}`, { state: block })
    }

    return (
        <div className='blocks'>
            <div className='blocks-group'>
                {blocks.map(block => (
                    <div key={block.id} onClick={() => handler(block.id, block)} className='back-blocks'>
                        <div className="front-blocks">
                            <div className='blocks-text'>
                                <div className="blocks-title">{block.title}</div>
                                <div className="blocks-description">{block.desription}</div>
                                <div className="blocks-image">
                                    <img className="blocks-image-source" src={block.photo}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div >
        </div>
    )
}