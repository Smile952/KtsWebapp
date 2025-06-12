import { JSX } from "react"
import { useState, useEffect } from "react";
import './Orders.css';
import { rout } from '../../common/addr'


interface Order {
    id: number;
    title: string;
    body: string;
    [key: string]: any;
}

export function Orders(): JSX.Element {
    const userId = localStorage.getItem('userId')
    const [orders, setOrders] = useState<Order[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(rout + '/orders?user_id=' + userId);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setOrders(jsonData);
            } catch (err) {
                console.error("Error fetching: " + err)
            }
        };

        fetchData();
    }, []);
    return <div className="orders">
        <div className="orders__list">
            {orders.map(order => (
                <div key={order.id} className="orders__item">
                    <h3 className="orders__title">{order.title}</h3>
                    <p className="orders__content">{order.description}</p>
                </div>
            ))}
        </div>
    </div>
}