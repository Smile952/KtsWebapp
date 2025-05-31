import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Admin } from '../../components/Admin/Admin'
import { synchronizeToken } from "../../common/synchronizeToken";
import { Unauthorized } from "../../components/Unauthorized/Unauthorized";
import { useState, useEffect } from "react";


export function AdmPage() {
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
            <Header text={['КТС-Администрация', 'Главная']} />
            <Admin />
            <Footer />
        </div>
    )
}