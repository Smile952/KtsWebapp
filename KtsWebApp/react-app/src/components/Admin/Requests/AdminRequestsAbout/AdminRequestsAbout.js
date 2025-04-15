import { useLocation } from "react-router-dom";
import './AdminRequestsAbout.css'
import { Buttons } from "./Buttons/Buttons";

export function AdminRequestsAbout() {
    const { state } = useLocation()

    return (
        <div>
            <div className="admin-content-block-text">
                <span>Заявка: {state.userId}, {state.employeeId}</span>
                <span>Тип заказа: {state.orderTypeId}</span>
                <span>Содержимое: {state.orderContent}</span>
            </div>
            <Buttons type={['orders', state.id]} />
        </div>
    )
}
