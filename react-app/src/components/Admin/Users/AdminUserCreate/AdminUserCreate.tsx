import { useNavigate } from 'react-router-dom';
import { Footer } from '../../../Footer/Footer';
import { Header } from '../../../Header/Header';
import './AdminUserCreate.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { Dayjs } from 'dayjs';

export function AdminUserCreate() {
    const navigate = useNavigate();
    const [date, setDate] = useState<Dayjs | null>(null);

    const updateClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const formDataObject: Record<string, any> = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        // Преобразуем дату из Dayjs объекта в ISO строку
        formDataObject['RegistrationDate'] = date ? date.toISOString() : null;

        fetch(form.action, {
            method: form.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        })
            .then(response => response.json())
            .then(data => {
                navigate('/');
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <Header text={['Ктс-Создание (пользователь)']} />
            <form
                onSubmit={updateClick}
                className="create-block-form"
                method="post"
                action="https://localhost:8080/api/users"
                encType="application/json"
            >
                <div className="mb-3">
                    <input
                        className="create-block-data form-control"
                        type="text"
                        name="Name"
                        placeholder="Имя"
                    />
                </div>
                <div className="mb-3">
                    <input
                        className="create-block-data form-control"
                        type="text"
                        name="Email"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-3">
                    <input
                        className="create-block-data form-control"
                        type="number"
                        name="Age"
                        placeholder="Age"
                        step={1}
                        min={1}
                        max={100}
                        id="age"
                    />
                </div>
                <div className="mb-3">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Дата регистрации"
                            slotProps={{
                                textField: {
                                    helperText: 'MM/DD/YYYY',
                                    name: 'RegistrationDate',
                                },
                            }}
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                        />
                    </LocalizationProvider>
                </div>
                <div>
                    <input className="create-button" type="submit" value="Create" />
                </div>
            </form>
            <Footer />
        </div>
    );
}
