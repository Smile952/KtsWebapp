import styles from './UserOrders.module.css';
import { LoadingSpinner } from 'common/LoadingSpinner';
import { useGetOrdersAsync } from 'services/useGetUserOrders';

export function UserOrders() {
    const {userOrders, isLoading} = useGetOrdersAsync()

    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className={styles.account_block}>
            {userOrders.map(order => (
                <div key={order.orderId} className={styles.account_order_block}>
                    <div className={styles.order_info}>
                        <p>Исполнитель: {order.employeeName}</p>
                    </div>
                    <div className={styles.order_info}>
                        <p>Статус заказа: {order.orderStatusName}</p>
                    </div>
                    <div className={styles.order_info}>
                        <p>Тип заказа: {order.orderTypeName}</p>
                    </div>
                    {order.orderContent && (
                        <div className={styles.order_info}>
                            <p>Комментарий заказчика: {order.orderContent}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
