import { useLocation } from 'react-router-dom'
import './AdminUsersAbout.css'
import { Buttons } from './Buttons/Buttons'

interface LocationState {
    id: number | string
    name: string
    email: string
    age: number
    registrationDate: string | Date
}

export function AdminUsersAbout() {
    const { state } = useLocation() as { state: LocationState | null }

    if (state !== null) {
        return (
            <div>
                <div className="admin-content-block-text">
                    <span>Имя: {state.name}</span>
                    <span>Email: {state.email}</span>
                    <span>Возраст: {state.age}</span>
                    <span>
                        Пароль: <span className="password">[скрыто]</span>
                    </span>
                    <span>Дата регистрации: {new Date(state.registrationDate).toLocaleDateString()}</span>
                </div>
                <Buttons type={['users', state.id]} />
            </div>
        )
    }

    return (
        <div>
            <div className="admin-content-block-text">
                <span>Имя: </span>
                <span>Email: </span>
                <span>Возраст:</span>
                <span>
                    Пароль: <span className="password"></span>
                </span>
                <span>Дата регистрации:</span>
            </div>
        </div>
    )
}
