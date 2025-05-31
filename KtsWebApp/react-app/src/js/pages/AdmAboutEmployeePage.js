import { AdminEmployeesAbout } from "../../components/Admin/Employees/AdminEmployeesAbout/AdminEmployeesAbout";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { synchronizeToken } from "../../common/synchronizeToken.js";
import { Unauthorized } from "../../components/Unauthorized/Unauthorized";
import { useState, useEffect } from "react";
import { ACCESS_LEVELS } from "../../common/routes.js";

export function AdmAboutEmployeePage() {
    const [isAuthorized, setIsAuthorized] = useState(null); // null - начальное состояние
    const [role, setRole] = useState(null)
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const isValid = await synchronizeToken(token);

            const role = localStorage.getItem('role')
            setIsAuthorized(isValid);
            setRole(role)
        };

        checkAuth();
    }, []);
    if (!isAuthorized && role === ACCESS_LEVELS.ADMIN) {
        return <Unauthorized />;
    }
    return (
        <div>
            <Header text={['КТС-Сотрудник', 'Админ-панель']} />
            <AdminEmployeesAbout />
            <Footer />
        </div>
    )
}