import { OrderEntity } from 'common/Entityes/OrderEntity/OrderEntity';
import styles from './UserOrders.module.css';
import { LoadingSpinner } from 'common/LoadingSpinner';
import { useGetOrdersAsync } from 'services/useGetUserOrders';
import { useFetch } from 'common/Hooks/useFetch';
import { FetchParams } from 'common/Entityes/FetchParams';
import { apiControllers, urlWayModification } from 'common/Constants/addr';
import { UserEntity } from 'common/Entityes/UserEntity/UserEntity';

export function UserOrders() {
    //const {userOrders, isLoading} = useGetOrdersAsync()

    const token = localStorage.getItem("token")
    const user = localStorage.getItem('user')
    const userEntity = JSON.parse(user as string) as UserEntity

    const params: FetchParams ={
        url: `${apiControllers.OrdersController}/${urlWayModification.UserOrders}?email=${userEntity.Email}`,
        method: "GET",
        headers: {
            "Content-Type": "Application/JSON",
            'Authorization': 'Bearer ' + token
        }
    }

    const {data, isLoading, isTokenValid} = useFetch<OrderEntity[]>({params});
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
