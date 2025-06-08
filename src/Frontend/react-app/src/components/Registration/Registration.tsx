import { JSX } from 'react';
import { Button } from '../Button/Button';
import './Registration.css';

export function Registration(): JSX.Element {
    return (
        <div className="registration">
            <div className="registration-back">
                <div className="registration-form-block">
                    <form className="registration-form">
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
                        <Button />
                    </form>
                </div>
            </div>
        </div>
    );
}
