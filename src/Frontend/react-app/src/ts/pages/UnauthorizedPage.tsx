import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Unauthorized } from "../../components/Unauthorized/Unauthorized";
import { JSX} from 'react'

export function UnauthorizedPage(): JSX.Element {

    return (
        <div>
            <Header title={"КТС-Не зарегестрирован"} text={["Портфолио", "Контакты", "Профиль"]} />
            <Unauthorized />
            <Footer />
        </div>
    );
}
