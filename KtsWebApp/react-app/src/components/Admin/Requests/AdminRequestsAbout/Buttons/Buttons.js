import './Buttons.css'

export function Buttons({ type }) {

    const deleteClick = () => {
        try {
            const res = fetch(`https://localhost:8080/api/${type[0]}/${type[1]}`, { method: 'DELETE' })
            console.log(res)
        }
        catch (Exception) {
            console.log(Exception)
        }
    }

    return (
        <div className="button">
            <div className="delete-button" onClick={deleteClick}>Delete</div>
            <div className='update-block'>
                <form id="form" className='update-block-form' method='post' action={`https://localhost:8080/api/${type[0]}/${type[1]}`}>
                    <div>
                        <input className='update-button' type='submit' value="Update"></input>
                    </div>
                    <div>
                        <span className='update-block-title'>Обновляемые данные</span>
                    </div>
                    <div className='mb-3'>
                        <input className='update-block-data form-control' type="text" name='UserId' placeholder='ИД Пользователя'></input>
                    </div>
                    <div className='mb-3'>
                        <input className='update-block-data form-control' type='text' name='EmployeeId' placeholder='ИД Сотрудника'></input>
                    </div>
                    <div className='mb-3'>
                        <input className='update-block-data form-control' type='text' name='OrderTypeId' placeholder='ИД Типа Заказа'></input>
                    </div>
                    <div className='mb-3'>
                        <input className='update-block-data form-control' type='text' name='OrderContent' placeholder='Текст заказа'></input>
                    </div>
                </form>
            </div>
        </div>
    )
}