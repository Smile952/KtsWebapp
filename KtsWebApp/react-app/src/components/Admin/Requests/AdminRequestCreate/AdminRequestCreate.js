import { useNavigate } from 'react-router-dom'
import { Footer } from '../../../Footer/Footer'
import { Header } from '../../../Header/Header'
import './AdminRequestCreate.css'

export function AdminRequestCreate() {
    const navigate = useNavigate()
    const updateClick = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        fetch(form.action, {
            method: form.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        })
            .then(response => response.json())
            .then(data => {
                navigate('/')
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <div>
            <Header text={['Ктс-Создание (запрос)']} />
            <form
                onSubmit={updateClick}
                className='create-block-form'
                method='post'
                action='https://localhost:8080/api/orders'
                enctype="application/json">
                <div className='mb-3'>
                    <input className='create-block-data form-control' type="text" name='UserId' placeholder='ИД Пользователя'></input>
                </div>
                <div className='mb-3'>
                    <input className='create-block-data form-control' type='text' name='EmployeeId' placeholder='ИД Сотрудника'></input>
                </div>
                <div className='mb-3'>
                    <input className='create-block-data form-control' type='text' name='OrderTypeId' placeholder='ИД Типа Заказа'></input>
                </div>
                <div className='mb-3'>
                    <input className='create-block-data form-control' type='text' name='OrderContent' placeholder='Текст заказа'></input>
                </div>
                <div>
                    <input className='create-button' type='submit' value="Create"></input>
                </div>
            </form>
            <Footer />
        </div>
    )
}