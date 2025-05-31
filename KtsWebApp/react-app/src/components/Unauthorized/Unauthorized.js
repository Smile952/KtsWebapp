import React from 'react';
import { Link } from 'react-router-dom';
import './Unauthorized.css';

export function Unauthorized() {
    return (
        <div className="body">
            <div className="container">
                <h1 className="heading">Доступ запрещён</h1>
                <p className="text">
                    Вы не авторизованы для просмотра этой страницы. Пожалуйста, войдите в систему.
                </p>
                <Link to="/signin" className="link">Войти</Link>
            </div>
        </div>
    );
};