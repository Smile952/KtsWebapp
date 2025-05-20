import './Admin.css';
import { useState, useEffect } from 'react';
import { AdminRequests } from './Requests/AdminRequests';
import { AdminEmployees } from './Employees/AdminEmployees';
import { AdminUsers } from './Users/AdminUsers';
import { useNavigate } from 'react-router-dom';
import { TemporaryDrawer } from './TemporaryDrawer'
import { useSearchParams } from 'react-router-dom';


export function Admin() {
    const [requestsContent, setRequestsContent] = useState([]);
    const [usersContent, setUsersContent] = useState([]);
    const [employeesContent, setEmployeesContent] = useState([]);
    const [sortDirection, setSortDirection] = useState();
    const [searchParams, setSearchParams] = useSearchParams()

    const nav = useNavigate();

    useEffect(() => {
        console.log(searchParams.get('status'))
        // Запрос данных заявок
        AdminRequests({ type: searchParams.get('type'), status: searchParams.get('status') })
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
    }, [searchParams]);


    const handler = (type, id, elem) => {
        nav(`/admin/${type}/${id}`, { state: elem });
    };

    const redirectToCreateField = (type) => {
        nav(`/admin/${type}/create`);
    };
    const requestSort = () => {
        setRequestsContent([...requestsContent].sort((a, b) => sortDirection === 1 ? b.id - a.id : a.id - b.id))
        setSortDirection(sortDirection === 1 ? 0 : 1)
    }
    const usersSort = () => {
        setUsersContent([...usersContent].sort((a, b) => sortDirection === 1 ? b.id - a.id : a.id - b.id))
        setSortDirection(sortDirection === 1 ? 0 : 1)
    }
    const employeesSort = () => {
        setEmployeesContent([...employeesContent].sort((a, b) => sortDirection === 1 ? b.id - a.id : a.id - b.id))
        setSortDirection(sortDirection === 1 ? 0 : 1)
    }

    return (
        <div className='admin'>
            <div className='admin-content'>
                {/* Колонка 1: Заявки */}
                <div className='admin-content-lists'>
                    <div className="admin-title">
                        <div className='admin-title-content'>
                            <h5 className="admin-title-text">Заявки</h5>
                            <div className='admin-button-create' onClick={() => redirectToCreateField('order')} title='Создать заявку'>+</div>
                        </div>
                        <div className='admin-button-display'>
                            <div className='admin-button-display sort' onClick={requestSort}>sort</div>
                            <TemporaryDrawer />
                        </div>
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
                        <div className='admin-title-content'>
                            <h5 className="admin-title-text">Пользователи</h5>
                            <div className='admin-button-create' onClick={() => redirectToCreateField('user')} title='Создать заявку'>+</div>
                        </div>
                        <div className='admin-button-display'>
                            <button className='admin-button-display sort' onClick={usersSort}>sort</button>
                        </div>
                    </div>
                    <div className="admin-content-block">
                        {usersContent.map((user, index) => (
                            <div key={index} onClick={() => handler("user", user.id, user)} className="admin-content-block-text">
                                <span>Имя: {user.name}</span>
                                <span>Email: {user.email}</span>
                                <span>Возраст: {user.age}</span>
                                <span>Дата регистрации: {new Date(user.registrationDate).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Колонка 3: Сотрудники */}
                <div className='admin-content-lists'>
                    <div className="admin-title">
                        <div className='admin-title-content'>
                            <h5 className="admin-title-text">Сотрудники</h5>
                            <div className='admin-button-create' onClick={() => redirectToCreateField('employee')} title='Создать заявку'>+</div>
                        </div>
                        <div className='admin-button-display'>
                            <button className='admin-button-display sort' onClick={employeesSort}>sort</button>

                        </div>
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
