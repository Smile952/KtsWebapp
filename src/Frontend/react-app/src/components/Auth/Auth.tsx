import React, { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import './Auth.css';
import { apiControllers } from 'common/Constants/addr';
import { useNavigate } from 'react-router-dom';
import { links } from 'common/Constants/links'
import { UserEntity } from 'common/Entityes/UserEntity/UserEntity';

export function Auth() {
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const nav = useNavigate()

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        const user = localStorage.getItem('user');
        console.log(token)
        console.log(user)
        if (token !== null && token !== 'null' && user !== undefined && user !== 'undefined') {
            nav(links['Главная'])
        }
    }, [token])

    const updateClick = async (event: React.FormEvent<HTMLFormElement>) => {
        setError(null);
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        
        const userLoginEntity: UserLoginEntity = {
            Email: formData.get("email") as string,
            Password: formData.get("password") as string
        };

        try {
            const response = await fetch(apiControllers.TokenController, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(userLoginEntity),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else{
                const data = await response.json();

                setToken(data.token);

                const parts = (data.token as string).split('.');
                const payload = JSON.parse(atob(parts[1]));
                const userData: UserEntity = { id:payload.id, name: payload.name, email: payload.email, permissionId: payload.role, token: data.token, registrationDate: null, age: null} 
                
                localStorage.setItem('token', (data.token as string));
                localStorage.setItem('user', JSON.stringify(userData));
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