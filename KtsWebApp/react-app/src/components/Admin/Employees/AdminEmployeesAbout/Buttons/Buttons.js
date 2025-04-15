import { Navigate, useNavigate } from 'react-router-dom'
import './Buttons.css'

export function Buttons({ type }) {
    const navigate = useNavigate()

    const deleteClick = () => {
        try {
            fetch(`https://localhost:8080/api/${type[0]}/${type[1]}`, { method: 'DELETE' })
            navigate('/')
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
                        <input className='update-block-data form-control' type="text" name='Name' placeholder='Имя'></input>
                    </div>
                    <div className='mb-3'>
                        <input className='update-block-data form-control' type='text' name='Post' placeholder='Должность'></input>
                    </div>
                </form>
            </div>
        </div>
    )
}