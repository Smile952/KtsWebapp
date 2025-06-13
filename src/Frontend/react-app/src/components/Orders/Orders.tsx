import { useState, useEffect } from 'react';
import styles from './Orders.module.css';
import { rout } from '../../common/addr';

interface Order {
    id: number;
    userId: number;
    employeeId: number;
    employeeName: string;
    orderTypeId: number;
    orderTypeName: string;
    orderStatusId: number;
    orderStatusName: string;
}

export function Orders() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${rout}/orders/user_orders/${userId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Ошибка загрузки: ${response.statusText}`);
                }

                const data = await response.json();
                setOrders(data);
            } catch (err: any) {
                setError(err.message || 'Неизвестная ошибка');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId, token]);

    if (loading) return <div className={styles.status}>Загрузка заказов...</div>;
    if (error) return <div className={styles.error}>Ошибка: {error}</div>;

    return (
        <div className={styles.orders}>
            <h2 className={styles.heading}>Мои заказы</h2>
            <div className={styles.list}>
                {orders.length === 0 ? (
                    <p className={styles.empty}>Нет заказов</p>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className={styles.item}>
                            <h3 className={styles.title}>Заказ №{order.id}</h3>
                            <ul className={styles.details}>
                                <li><strong>Исполнитель:</strong> {order.employeeName}</li>
                                <li><strong>ИД исполнителя:</strong> {order.employeeId}</li>
                                <li><strong>Order Type ID:</strong> {order.orderTypeName}</li>
                                <li><strong>Status ID:</strong> {order.orderStatusName}</li>
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

}
