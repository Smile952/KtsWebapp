import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Services } from "../../components/Services/Services";
import { synchronizeToken } from "../../common/synchronizeToken";
import { Unauthorized } from "../../components/Unauthorized/Unauthorized";
import { JSX, useState, useEffect } from "react";

export function DevTypesPage(): JSX.Element {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // null - начальное состояние

    useEffect(() => {
        const checkAuth = async (): Promise<void> => {
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
            <Header text={["КТС-Возможности", "Портфолио", "Контакты", "Профиль", "Регистрация"]} />
            <Services />
            <Footer />
        </div>
    );
}
