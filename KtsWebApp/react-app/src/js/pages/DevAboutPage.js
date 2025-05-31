import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Service } from "../../components/Service/Service"
import { synchronizeToken } from "../../common/synchronizeToken";
import { Unauthorized } from "../../components/Unauthorized/Unauthorized";
import { useState, useEffect } from "react";

export function DevAboutPage() {
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
            <Header text={["КТС-Возможности", "Главная", "Портфолио", "Контакты", "Профиль"]} />
            <Service />
            <Footer />
        </div>
    )
}