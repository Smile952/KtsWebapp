import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Registration } from "../../components/Registration/Registration";
import { JSX } from 'react'

export function RegistrationPage(): JSX.Element {
    return (
        <div>
            <Header title={"КТС-Регистрация"} text={["Главная"]} />
            <Registration />
            <Footer />
        </div>
    );
}
