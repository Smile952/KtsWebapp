import './Admin.css'

export function Admin() {
    return (
        <div className='admin'>
            <div className='admin-content'> 
                <div className='admin-content-lists'>
                    <div className="admin-title">
                        <h5 className="admin-title-text">Заявки</h5>
                    </div>
                    <div className="admin-content-block">
                        <div className="admin-content-block-text"></div>
                    </div>
                </div>
                <div className='admin-content-lists'>
                    <div className="admin-title">
                        <h5 className="admin-title-text">Пользователи</h5>
                    </div>
                    <div className="admin-content-block">
                        <div className="admin-content-block-text"></div>
                    </div>
                </div>
                <div className='admin-content-lists'>
                    <div className="admin-title">
                        <h5 className="admin-title-text">Сотрудники</h5>
                    </div>
                    <div className="admin-content-block">
                        <div className="admin-content-block-text"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}