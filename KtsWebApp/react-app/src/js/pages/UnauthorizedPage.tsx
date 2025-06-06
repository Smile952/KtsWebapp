import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Unauthorized } from "../../components/Unauthorized/Unauthorized";
import { JSX } from 'react'

export function UnauthorizedPage(): JSX.Element {
    return (
        <div>
            <Header text={["КТС-Не зарегестрирован", "Портфолио", "Контакты", "Профиль", "Регистрация"]} />
            <Unauthorized />
            <Footer />
        </div>
    );
}
