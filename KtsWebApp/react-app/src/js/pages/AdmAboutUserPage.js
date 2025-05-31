import { AdminUsersAbout } from "../../components/Admin/Users/AdminUsersAbout/AdminUsersAbout";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { synchronizeToken } from "../../common/synchronizeToken";
import { Unauthorized } from "../../components/Unauthorized/Unauthorized";
import { useState, useEffect } from "react";

export function AdmAboutUserPage() {
    const [isAuthorized, setIsAuthorized] = useState(null); // null - начальное состояние

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const isValid = await synchronizeToken(token);
            setIsAuthorized(isValid);
        };

        checkAuth();
    }, []);
    if (!isAuthorized) {
        return <Unauthorized />;
    }
    return (
        <div>
            <Header text={['КТС-Пользователь', 'Админ-панель']} />
            <AdminUsersAbout />
            <Footer />
        </div>
    )
}