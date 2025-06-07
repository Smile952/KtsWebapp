import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Request } from "../../components/Request/Request";
import { synchronizeToken } from "../../common/synchronizeToken";
import { Unauthorized } from "../../components/Unauthorized/Unauthorized";
import { JSX, useState, useEffect } from "react";

export function RequestPage(): JSX.Element {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // null - начальное состояние

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
            <Header text={["КТС-Заявка", "Главная", "Контакты", "Профиль"]} />
            <Request />
            <Footer />
        </div>
    );
}
