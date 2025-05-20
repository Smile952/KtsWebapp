import { useNavigate } from 'react-router-dom'
import { Footer } from '../../../Footer/Footer'
import { Header } from '../../../Header/Header'
import './AdminUserCreate.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';


export function AdminUserCreate() {
    const navigate = useNavigate()
    const { date, setDate } = useState()
    const updateClick = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        formDataObject['RegistrationDate'] = new Date(formDataObject['RegistrationDate'])

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
            <Header text={['Ктс-Создание (пользователь)']} />
            <form
                onSubmit={updateClick}
                className='create-block-form'
                method='post'
                action={`https://localhost:8080/api/users`}
                enctype="application/json">
                <div className='mb-3'>
                    <input className='create-block-data form-control' type="text" name='Name' placeholder='Имя'></input>
                </div>
                <div className='mb-3'>
                    <input className='create-block-data form-control' type='text' name='Email' placeholder='Email'></input>
                </div>
                <div className='mb-3'>
                    <input className='create-block-data form-control' type='number' name='Age' placeholder='Age' step="1" min="1" max="100" id="age"></input>
                </div>
                <div className='mb-3'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Helper text example"
                            slotProps={{
                                textField: {
                                    helperText: 'MM/DD/YYYY',
                                },
                            }}
                            onChange={setDate}
                            name='RegistrationDate'
                        />
                    </LocalizationProvider>
                </div>
                <div>
                    <input className='create-button' type='submit' value="Create"></input>
                </div>
            </form>
            <Footer />
        </div>
    )
}