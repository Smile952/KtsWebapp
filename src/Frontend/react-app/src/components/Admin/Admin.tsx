import './Admin.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TemporaryDrawer } from './TemporaryDrawer';
import { OrderEntity } from 'common/Entityes/OrderEntity/OrderEntity';
import { UserEntity } from 'common/Entityes/UserEntity/UserEntity';
import { useFetch } from 'common/Hooks/useFetch';
import { FetchParams } from 'common/Entityes/FetchParams';
import { apiControllers } from 'common/Constants/addr';
import { LoadingSpinner } from 'common/LoadingSpinner';


export function Admin() {
    const [ordersContent, setOrdersContent] = useState<OrderEntity[]>([]);
    const [usersContent, setUsersContent] = useState<UserEntity[]>([]);
    const [employeesContent, setEmployeesContent] = useState<EmployeeEntity[]>([]);
    const [sortDirection, setSortDirection] = useState<number | undefined>(undefined);

    const nav = useNavigate();

    const token = localStorage.getItem('token')

    const init: RequestInit = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        } 

    const orderParams: FetchParams = {
        url: `https://localhost:8080/api/orders`,
        init: init
    }
    const [orderData, isOrderLoading] = useFetch<OrderEntity[]>([orderParams])

    const userParams: FetchParams = {
        url: `${apiControllers.UsersController}`,
        init: init
    }
    const [userData, isUserLoading] = useFetch<UserEntity[]>([userParams])


    const employeeParams: FetchParams = {
        url: `${apiControllers.EmployeesController}`,
        init: init
    }
    const [employeeData, isEmployeeLoading] = useFetch<EmployeeEntity[]>([employeeParams])

    const handler = (type: string, id: number, elem: any) => {
        nav(`/admin/${type}/${id}`, { state: elem });
    };

    const redirectToCreateField = (type: string) => {
        nav(`/admin/${type}/create`);
    };

    const requestSort = () => {
        setOrdersContent([...ordersContent].sort((a, b) => (sortDirection === 1 ? b.id - a.id : a.id - b.id)));
        setSortDirection(sortDirection === 1 ? 0 : 1);
    };

    const usersSort = () => {
        setUsersContent([...usersContent].sort((a, b) => (sortDirection === 1 ? b.id - a.id : a.id - b.id)));
        setSortDirection(sortDirection === 1 ? 0 : 1);
    };

    const employeesSort = () => {
        setEmployeesContent([...employeesContent].sort((a, b) => (sortDirection === 1 ? b.id - a.id : a.id - b.id)));
        setSortDirection(sortDirection === 1 ? 0 : 1);
    };

    return (
        <div className="admin">
            <div className="admin-content">
                {/* Колонка 1: Заявки */}
                <div className="admin-content-lists">
                    <div className="admin-title">
                        <div className="admin-title-content">
                            <h5 className="admin-title-text">Заявки</h5>
                            <div
                                className="admin-button-create"
                                onClick={() => redirectToCreateField('order')}
                                title="Создать заявку"
                            >
                                +
                            </div>
                        </div>
                        <div className="admin-button-display">
                            <div className="admin-button-display sort" onClick={() => orderData?.sort((a, b) => (sortDirection === 1 ? b.id - a.id: a.id - b.id))}>
                                sort
                            </div>
                            <TemporaryDrawer />
                        </div>
                    </div>
                    <div className="admin-content-block">
                        {isOrderLoading ? <LoadingSpinner/> :
                            orderData?.map((order) => (
                                <div
                                    key={order.id}
                                    onClick={() => handler('order', order.id, order)}
                                    className="admin-content-block-text"
                                >
                                    <span>Заявка от: {order.userName}</span>
                                    <span>Исполнитель: {order.employeeName}</span>
                                    <span>Тип заказа: {order.orderTypeId}</span>
                                    <span>Содержимое: {order.orderContent}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Колонка 2: Пользователи */}
                <div className="admin-content-lists">
                    <div className="admin-title">
                        <div className="admin-title-content">
                            <h5 className="admin-title-text">Пользователи</h5>
                            <div
                                className="admin-button-create"
                                onClick={() => redirectToCreateField('user')}
                                title="Создать заявку"
                            >
                                +
                            </div>
                        </div>
                        <div className="admin-button-display">
                            <button className="admin-button-display sort" onClick={usersSort}>
                                sort
                            </button>
                        </div>
                    </div>
                    <div className="admin-content-block">
                        {isUserLoading ? <LoadingSpinner/> : 
                            (userData as UserEntity[]).map((user, index) => (
                                <div
                                    key={index}
                                    onClick={() => handler('user', user.id, user)}
                                    className="admin-content-block-text"
                                >
                                    <span>Имя: {user.name}</span>
                                    <span>Email: {user.email}</span>
                                    <span>Возраст: {user.age}</span>
                                    <span>Дата регистрации: {new Date(user.registrationDate as string).toLocaleDateString()}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Колонка 3: Сотрудники */}
                <div className="admin-content-lists">
                    <div className="admin-title">
                        <div className="admin-title-content">
                            <h5 className="admin-title-text">Сотрудники</h5>
                            <div
                                className="admin-button-create"
                                onClick={() => redirectToCreateField('employee')}
                                title="Создать заявку"
                            >
                                +
                            </div>
                        </div>
                        <div className="admin-button-display">
                            <button className="admin-button-display sort" onClick={() => employeeData?.sort((a, b) => (sortDirection === 1 ? b.id - a.id: a.id - b.id))}>
                                sort
                            </button>
                        </div>
                    </div>
                    <div className="admin-content-block">
                        {isEmployeeLoading ? <LoadingSpinner/> : 
                            (employeeData as EmployeeEntity[]).map((emp) => (
                                <div
                                    key={emp.id}
                                    onClick={() => handler('employee', emp.id, emp)}
                                    className="admin-content-block-text"
                                >
                                    <span>Имя: {emp.name}</span>
                                    <span>
                                        Пароль: <span className="password">[скрыто]</span>
                                    </span>
                                    <span>Должность: {emp.post}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

