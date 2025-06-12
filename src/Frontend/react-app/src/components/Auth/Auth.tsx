import React, { useState } from 'react';
import { Button } from '../Button/Button';
import './Auth.css';
import { getToken } from './login';
import { useNavigate } from 'react-router-dom';
import { rout } from 'common/addr';
interface FormDataObject {
    [key: string]: FormDataEntryValue;
}

export function Auth() {
    const [error, setError] = useState<string | null>(null);
    const nav = useNavigate();
    const updateClick = async (event: React.FormEvent<HTMLFormElement>) => {
        setError(null);
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
                localStorage.setItem('userId', tokenData['userId']);
                nav('/')
            }
            else {
                nav('/signup')
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Ошибка авторизации. Попробуйте снова.');
        }
    };

    return (
        <div className={`autorization ${error ? 'autorization-error' : ''}`}>
            <div className="autorization-back">
                <div className="autorization-form-block">
                    <form
                        className='autorization-form'
                        action={rout + '/users/token'}
                        method='post'
                        onSubmit={updateClick}
                    >
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                        <div className='autorization-input-block'>
                            <input
                                className={`autorization-input ${error ? 'input-error' : ''}`}
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder="Email"
                            />
                        </div>
                        <div className='autorization-input-block'>
                            <input
                                className={`autorization-input ${error ? 'input-error' : ''}`}
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
