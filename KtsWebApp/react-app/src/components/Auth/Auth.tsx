import React from 'react';
import { Button } from '../Button/Button';
import './Auth.css';
import { getToken } from './login';

interface FormDataObject {
    [key: string]: FormDataEntryValue;
}

export function Auth() {
    const updateClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const formDataObject: FormDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        try {
            const tokenData = await getToken(formDataObject);
            if (tokenData) {
                localStorage.setItem('token', tokenData['token']);
                localStorage.setItem('role', tokenData['role']);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='autorization'>
            <div className="autorization-back">
                <div className="autorization-form-block">
                    <form
                        className='autorization-form'
                        action='https://localhost:8080/api/users/token'
                        method='post'
                        onSubmit={updateClick}
                    >
                        <div className='autorization-input-block'>
                            <input
                                className="autorization-input"
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder="Email"
                            />
                        </div>
                        <div className='autorization-input-block'>
                            <input
                                className="autorization-input"
                                type="password"
                                name="password"
                                id="password"
                                required
                                placeholder="Пароль"
                            />
                        </div>
                        <Button />
                    </form>
                </div>
            </div>
        </div>
    );
}
