import { useLocation } from "react-router-dom";
import './AdminRequestsAbout.css'
import { Buttons } from "./Buttons/Buttons";

export function AdminRequestsAbout() {
    const { state } = useLocation()

    if (state !== null) {

        return (
            <div>
                <div className="admin-content-block-text">
                    <span>Заявка от: {state.userName}</span>
                    <span>Исполнитель: {state.employeeName}</span>
                    <span>Тип заказа: {state.orderTypeId}</span>
                    <span>Содержимое: {state.orderContent}</span>
                </div>
                <Buttons type={['orders', state.id]} />
            </div>
        )
    }
    return (
        <div>
            <div className="admin-content-block-text">
                <span>Заявка:</span>
                <span>Тип заказа:</span>
                <span>Содержимое:</span>
            </div>
        </div>
    )
}
