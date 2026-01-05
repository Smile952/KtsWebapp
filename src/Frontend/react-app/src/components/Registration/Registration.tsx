import { JSX } from 'react';
import { Button } from '../Button/Button';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import { apiControllers } from 'common/Constants/addr';
import { links } from 'common/Constants/links';

export function Registration(): JSX.Element {

    const nav = useNavigate()
    const RegistrationQuery = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const Password: string = formData.get('Password') as string;
        const Password2: string = formData.get('password2') as string;

        if (Password !== Password2) {
            alert("Пароли не совпадают!");
            return;
        }

        const userRedisterEntity: UserRegistrEntity = {
            Name: formData.get('Name') as string,
            Email: formData.get('Email') as string,
            Password: Password,
            PermissionId: 1
        }

        try {
            const response = await fetch(apiControllers.UsersController, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userRedisterEntity),
            });

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            nav(links["Главная"])

        } catch (error) {
            console.error('Ошибка регистрации:', error);
            alert("Произошла ошибка при регистрации");
        }
    }

    return (
        <div className="registration">
            <div className="registration-back">
                <div className="registration-form-block">
                    <form className="registration-form" onSubmit={RegistrationQuery}>
                        <div className="registration-input-block">
                            <input
                                className="registration-input"
                                type="text"
                                name="Name"
                                required
                                placeholder="Имя:"
                            />
                        </div>
                        <div className="registration-input-block">
                            <input
                                className="registration-input"
                                type="email"
                                name="Email"
                                id="email"
                                required
                                placeholder="Email"
                            />
                        </div>
                        <div className="registration-input-block">
                            <input
                                className="registration-input"
                                type="password"
                                name="Password"
                                id="password"
                                required
                                placeholder="Пароль"
                            />
                        </div>
                        <div className="registration-input-block">
                            <input
                                className="registration-input"
                                type="password"
                                name="password2"
                                id="password2"
                                required
                                placeholder="Повторить пароль"
                            />
                        </div>
                        <input className='registration-permission'
                            type='hidden'
                            name='permission'
                            id='permission'
                        />
                        <Button />
                    </form>
                </div>
            </div>
        </div>
    );
}
