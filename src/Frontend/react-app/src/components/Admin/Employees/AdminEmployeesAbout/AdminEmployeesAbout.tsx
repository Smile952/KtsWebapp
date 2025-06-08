import { useLocation } from 'react-router-dom';
import { Buttons } from './Buttons/Buttons';

interface EmployeeState {
    id: string;
    name: string;
    post: string;
}

export function AdminEmployeesAbout() {
    const location = useLocation();
    const state = location.state as EmployeeState | null;

    if (state !== null) {
        return (
            <div>
                <div className="admin-content-block-text">
                    <span>Имя: {state.name}</span>
                    <span>Должность: {state.post}</span>
                </div>
                <Buttons type={['employees', state.id]} />
            </div>
        );
    }

    return (
        <div>
            <div className="admin-content-block-text">
                <span>Имя: </span>
                <span>Должность: </span>
            </div>
        </div>
    );
}
