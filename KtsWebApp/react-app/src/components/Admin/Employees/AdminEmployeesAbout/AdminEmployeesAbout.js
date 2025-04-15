import { useLocation } from "react-router-dom";
import './AdminEmployeesAbout.css'
import { Buttons } from "./Buttons/Buttons";

export function AdminEmployeesAbout() {
    const { state } = useLocation()

    return (
        <div>
            <div className="admin-content-block-text">
                <span>Имя: {state.name}</span>
                <span>Пароль: <span className="password">[скрыто]</span></span>
                <span>Должность: {state.post}</span>
            </div>
            <Buttons type={['employees', state.id]} />
        </div>
    )
}
