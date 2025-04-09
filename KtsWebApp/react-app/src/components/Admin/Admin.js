import './Admin.css'
import React, { useEffect, useState } from 'react';
import { AdminRequests } from './AdminRequests'
import { AdminEmployees } from './AdminEmployees';
import { AdminUsers } from './AdminUsers';

export function Admin() {
    const [requestsContent, setRequestsContent] = useState([]);
    const [usersContent, setUsersContent] = useState([]);
    const [employeesContent, setEmployeesContent] = useState([]);


    useEffect(() => {
        AdminRequests().then(result => {
            setRequestsContent(result);
        }).catch(error => {
            console.error('Error fetching admin requests:', error);
        });
        AdminEmployees().then(result => {
            setEmployeesContent(result)
        }).catch(error => {
            console.error('Error fetching admin requests:', error);
        })
        AdminUsers().then(result => {
            setUsersContent(result)
        }).catch(error => {
            console.error('Error fetching admin requests:', error);
        })
    }, []);
    console.log(usersContent)
    console.log(employeesContent)
    return (
        <div className='admin'>
            <div className='admin-content'>
                {/* Колонка 1: Заявки */}
                <div className='admin-content-lists'>
                    <div className="admin-title">
                        <h5 className="admin-title-text">Заявки</h5>
                    </div>
                    <div className="admin-content-block">
                        {requestsContent.map((request, index) => (
                            <div key={index} className="admin-content-block-text">
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
                    </div>
                    <div className="admin-content-block">
                        {usersContent.map((user, index) => (
                            <div key={index} className="admin-content-block-text">
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
                    </div>
                    <div className="admin-content-block">
                        {employeesContent.map((emp, index) => (
                            <div key={index} className="admin-content-block-text">
                                <span>Имя: {emp.name}</span>
                                <span>Пароль: <span className="password">[скрыто]</span></span>
                                <span>Должность: {emp.post}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}