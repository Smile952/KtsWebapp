import './Block.css'

export function Block({ title, text }) {
    return (
        <div className='block'>
            <div className='block-group'>
                <div className='back-block'>
                    <div className="front-block">
                        <a className='block-link' href='devTypes/request'>
                            <div className='block-text'>
                                <div className="block-title">Web Разработка</div>
                                <div className="block-description">Создание и разработка современных сайтов и приложений</div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className='back-block'>
                    <div className="front-block">
                        <a className='block-link' href='devTypes/request'>
                            <div className='block-text'>
                                <div className="block-title">Android/iOS</div>
                                <div className="block-description">Разработка приложений для iOS и Android.</div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className='back-block'>
                    <div className="front-block">
                        <a className='block-link' href='devTypes/request'>
                            <div className='block-text'>
                                <div className="block-title">DevOps и облако</div>
                                <div className="block-description">Настройка инфраструктуры и автоматизация процессов.  </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div >
        </div>
    )
}