import { useNavigate } from 'react-router-dom'
import { Footer } from '../../../Footer/Footer'
import { Header } from '../../../Header/Header'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import './AdminUserCreate.css'

export function AdminUserCreate() {
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState(null);

  
    const handleDateChange = (newValue) => {
        setSelectedDate(newValue); 
    };
    const updateClick = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        console.log(selectedDate)

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
                        <DemoContainer 
                            components={['DatePicker']}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                            <DatePicker 
                                format='LL'
                                label="Registration date" 
                                name='RegistrationDate'
                                sx={{
                                    width: '300px', 
                                    '& .MuiInputBase-input': {
                                      textAlign: 'center', 
                                    },
                                    '& .MuiInputLabel-root': {
                                      textAlign: 'center', 
                                      width: '100%', 
                                      transformOrigin: 'center', 
                                      color: '#1976d2', 
                                    },
                                    '& .MuiInputLabel-shrink': {
                                      transform: 'translate(-88px, -10px) scale(0.75)', 
                                      transformOrigin: 'center', 
                                    },
                                    '& .MuiInputBase-root': {
                                      borderRadius: '8px', 
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: '#1976d2', 
                                    },
                                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                      borderColor: '#1976d2',
                                      borderWidth: '2px', 
                                    },
                                  }}/>
                        </DemoContainer>
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