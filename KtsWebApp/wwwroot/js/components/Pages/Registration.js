import React from 'react';

function Registration() {

    return (
        <div>
            <form action="post">
                <input
                    type="email"
                    placeholder="Email"
                />
                <input
                    type="text"
                    placeholder="Username"
                />
                <input
                    type="password"
                    placeholder="Пароль"
                />
                <input 
                    type="password"
                    placeholder="Password again"
                />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
}

export default Registration;