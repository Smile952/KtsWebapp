import { OrderEntity } from 'common/Entityes/OrderEntity/OrderEntity';
import styles from './UserOrders.module.css';
import { LoadingSpinner } from 'common/LoadingSpinner';
import { useFetch } from 'common/Hooks/useFetch';
import { FetchParams } from 'common/Entityes/FetchParams';
import { apiControllers, urlWayModification } from 'common/Constants/addr';
import { UserDataAndTokenStore } from 'store/store';

export function UserOrders() {

    const userStore = UserDataAndTokenStore.getState().UserEntity

    const token = userStore.token
    const user = userStore

    const init: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "Application/JSON",
            'Authorization': 'Bearer ' + token
        }
    }

    const params: FetchParams ={
        url: `${apiControllers.OrdersController}/${urlWayModification.UserOrders}?email=${user.email}`,
        init: init
    }

    const [data, isLoading, isTokenValid] = useFetch<OrderEntity[]>([params]);
    if(isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className={styles.account_block}>
            {data?.map(order => (
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
