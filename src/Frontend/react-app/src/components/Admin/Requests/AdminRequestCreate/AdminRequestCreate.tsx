import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../../Footer/Footer';
import { Header } from '../../../Header/Header';
import './AdminRequestCreate.css';

export function AdminRequestCreate() {
    const navigate = useNavigate();

    const updateClick = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const formDataObject: Record<string, string> = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value.toString();
        });

        console.log(JSON.stringify(formDataObject));

        fetch(form.action, {
            method: form.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        })
            .then((response) => response.json())
            .then((data) => {
                navigate('/');
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <Header text={['Ктс-Создание (запрос)']} />
            <form
                onSubmit={updateClick}
                className="create-block-form"
                method="post"
                action="http://localhost:8080/api/orders"
                encType="application/json"
            >
                <div className="mb-3">
                    <input
                        className="create-block-data form-control"
                        type="text"
                        name="UserId"
                        placeholder="ИД Пользователя"
                    />
                </div>
                <div className="mb-3">
                    <input
                        className="create-block-data form-control"
                        type="text"
                        name="EmployeeId"
                        placeholder="ИД Сотрудника"
                    />
                </div>
                <div className="mb-3">
                    <input
                        className="create-block-data form-control"
                        type="text"
                        name="OrderTypeId"
                        placeholder="ИД Типа Заказа"
                    />
                </div>
                <div className="mb-3">
                    <input
                        className="create-block-data form-control"
                        type="text"
                        name="OrderContent"
                        placeholder="Текст заказа"
                    />
                </div>
                <div>
                    <input className="create-button" type="submit" value="Create" />
                </div>
            </form>
            <Footer />
        </div>
    );
}
