import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Registration } from "../../components/Registration/Registration";
import { JSX } from 'react'

export function RegistrationPage(): JSX.Element {
    return (
        <div>
            <Header text={["КТС-Регистрация", "Главная", "Авторизация"]} />
            <Registration />
            <Footer />
        </div>
    );
}
