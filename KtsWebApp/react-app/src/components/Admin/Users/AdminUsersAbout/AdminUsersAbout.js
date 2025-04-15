import { useLocation } from "react-router-dom";
import './AdminUsersAbout.css'
import { Buttons } from "./Buttons/Buttons";

export function AdminUsersAbout() {
    const { state } = useLocation()

    return (
        <div>
            <div className="admin-content-block-text">
                <span>Имя: {state.name}</span>
                <span>Email: {state.email}</span>
                <span>Возраст: {state.age}</span>
                <span>Пароль: <span className="password">[скрыто]</span></span>
                <span>Дата регистрации: {new Date(state.registrationDate).toLocaleDateString()}</span>
            </div>
            <Buttons type={['users', state.id]} />
        </div>
    )
}
