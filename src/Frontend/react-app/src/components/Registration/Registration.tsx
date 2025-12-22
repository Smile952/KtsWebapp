import { JSX } from 'react';
import { Button } from '../Button/Button';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import { apiControllers } from 'common/addr';
import { links } from 'common/links';

export function Registration(): JSX.Element {

    const nav = useNavigate()
    const RegistrationQuery = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const formDataObject: Record<string, string> = {};
        formData.forEach((value, key) => {
            if (typeof value === 'string') {
                formDataObject[key] = value;
            }
        });
        formDataObject['permission'] = '1';

        if (formDataObject.password !== formDataObject.password2) {
            alert("Пароли не совпадают!");
            return;
        }

        const { password2, ...dataToSend } = formDataObject;

        try {
            const response = await fetch(apiControllers.UsersControllerSignUp, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
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
                                name="name"
                                required
                                placeholder="Имя:"
                            />
                        </div>
                        <div className="registration-input-block">
                            <input
                                className="registration-input"
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder="Email"
                            />
                        </div>
                        <div className="registration-input-block">
                            <input
                                className="registration-input"
                                type="password"
                                name="password"
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
