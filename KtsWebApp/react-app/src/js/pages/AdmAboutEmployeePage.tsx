import { AdminEmployeesAbout } from "../../components/Admin/Employees/AdminEmployeesAbout/AdminEmployeesAbout";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { synchronizeToken } from "../../common/synchronizeToken";
import { Unauthorized } from "../../components/Unauthorized/Unauthorized";
import { useState, useEffect } from "react";

export function AdmAboutEmployeePage() {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const isValid = await synchronizeToken(token);
            setIsAuthorized(isValid);
        };

        checkAuth();
    }, []);

    if (isAuthorized === null) {
        // Можно вернуть лоадер или пустой div, пока идет проверка
        return <div>Загрузка...</div>;
    }

    if (!isAuthorized) {
        return <Unauthorized />;
    }

    return (
        <div>
            <Header text={['КТС-Сотрудник', 'Админ-панель']} />
            <AdminEmployeesAbout />
            <Footer />
        </div>
    );
}
