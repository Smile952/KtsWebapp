import './Admin.css';
import React, { useState, useEffect } from 'react';
import { AdminRequests } from './Requests/AdminRequests';
import { AdminEmployees } from './Employees/AdminEmployees';
import { AdminUsers } from './Users/AdminUsers';
import { useNavigate } from 'react-router-dom';

export function Admin() {
    console.log('test')
    const [requestsContent, setRequestsContent] = useState([{
        id: -1,
        userId: -1,
        employeeId: -1,
        orderTypeId: -1,
        orderContent: 'empty'
    }]);
    const [usersContent, setUsersContent] = useState([{
        id: -1,
        name: 'empty',
        email: 'empty@example.com',
        age: 0,
        registrationDate: '1000-01-01T00:00:00Z'
    }]);
    const [employeesContent, setEmployeesContent] = useState([{
        id: -1,
        name: 'empty',
        post: 'empty'
    }]);

    const nav = useNavigate();

    useEffect(() => {
        // Запрос данных заявок
        AdminRequests()
            .then(result => setRequestsContent(result))
            .catch(error => {
                console.error('Error fetching admin requests:', error);
            });

        // Запрос данных сотрудников
        AdminEmployees()
            .then(result => setEmployeesContent(result))
            .catch(error => {
                console.error('Error fetching admin employees:', error);
            });

        // Запрос данных пользователей
        AdminUsers()
            .then(result => setUsersContent(result))
            .catch(error => {
                console.error('Error fetching admin users:', error);
            });
    }, []);

    const handler = (type, id, elem) => {
        nav(`/admin/${type}/${id}`, { state: elem });
    };

    const redirectToCreateField = (type) => {
        nav(`/admin/${type}/create`);
    };

    console.log(usersContent)
    console.log(employeesContent)
    console.log(requestsContent)

    return (
        <div className='admin'>
            <div className='admin-content'>
                {/* Колонка 1: Заявки */}
                <div className='admin-content-lists'>
                    <div className="admin-title">
                        <h5 className="admin-title-text">Заявки</h5>
                        <div className='admin-button-create' onClick={() => redirectToCreateField('order')} title='Создать заявку'>+</div>
                    </div>
                    <div className="admin-content-block">
                        {requestsContent.map((request, index) => (
                            <div key={index} onClick={() => handler('order', request.id, request)} className="admin-content-block-text">
                                <span>Заявка: {request.userId}, {request.employeeId}</span>
                                <span>Тип заказа: {request.orderTypeId}</span>
                                <span>Содержимое: {request.orderContent}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Колонка 2: Пользователи */}
                <div className='admin-content-lists'>
                    <div className="admin-title">
                        <h5 className="admin-title-text">Пользователи</h5>
                        <div className='admin-button-create' onClick={() => redirectToCreateField('user')} title="Создать пользователя">+</div>
                    </div>
                    <div className="admin-content-block">
                        {usersContent.map((user, index) => (
                            <div key={index} onClick={() => handler("user", user.id, user)} className="admin-content-block-text">
                                <span>Имя: {user.name}</span>
                                <span>Email: {user.email}</span>
                                <span>Возраст: {user.age}</span>
                                <span>Пароль: <span className="password">[скрыто]</span></span>
                                <span>Дата регистрации: {new Date(user.registrationDate).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Колонка 3: Сотрудники */}
                <div className='admin-content-lists'>
                    <div className="admin-title">
                        <h5 className="admin-title-text">Сотрудники</h5>
                        <div className='admin-button-create' onClick={() => redirectToCreateField('employee')} title='Создать сотрудника'>+</div>
                    </div>
                    <div className="admin-content-block">
                        {employeesContent.map((emp, index) => (
                            <div key={index} onClick={() => handler("employee", emp.id, emp)} className="admin-content-block-text">
                                <span>Имя: {emp.name}</span>
                                <span>Пароль: <span className="password">[скрыто]</span></span>
                                <span>Должность: {emp.post}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
