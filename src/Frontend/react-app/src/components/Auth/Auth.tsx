import React, { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import './Auth.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, tokenSelector, UserData, userSelector } from 'store/authSlice';
import { apiControllers } from 'common/addr';
import { AppDispatch } from 'store/store';
import { useNavigate } from 'react-router-dom';
import { links } from 'common/links';
interface FormDataObject {
    [key: string]: FormDataEntryValue;
}

export function Auth() {
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector(tokenSelector)
    const user = useSelector(userSelector)
    const nav = useNavigate()

    useEffect(() => {
        if (token && user) {
            nav(links['Главная'])
        }
    }, [token, user, nav])

    const updateClick = async (event: React.FormEvent<HTMLFormElement>) => {
        setError(null);
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const formDataObject: FormDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        const userData: UserData = {
            id: null,
            name: String(formDataObject['name']),
            email: String(formDataObject['email']),
            age: parseInt(String(formDataObject['age'])),
            password: String(formDataObject['password']),
            permissionId: parseInt(String(formDataObject['permissionId']))
        }

        try {
            await dispatch(loginUser(userData));
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
                        action={apiControllers.TokenController}
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