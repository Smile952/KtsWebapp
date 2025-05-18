import { useNavigate } from 'react-router-dom'
import './Services.css'

export function Services() {
    const blocks = [
        { id: 1, title: 'Web Разработка', description: 'Создание и разработка современных сайтов и приложений', photo: '/Images/WebDev/web-development.jpg' },
        { id: 2, title: 'Android/iOS', description: 'Разработка приложений для iOS и Android', photo: '/Images/Mobile/android.jpg' },
        { id: 3, title: 'DevOps и облако', description: 'Настройка инфраструктуры и автоматизация процессов', photo: '/Images/DevOps/devops.jpg' }
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
                                <div className="blocks-description">{block.description}</div> {/* Исправьте опечатку: desription -> description */}
                                <div className="blocks-image">
                                    <img className="blocks-image-source" src={block.photo} alt={block.title} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}