import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Unauthorized } from "../../components/Unauthorized/Unauthorized.js"

export function UnauthorizedPage() {
    return (
        <div>
            <Header text={["КТС-Не зарегестрирован", "Портфолио", "Контакты", "Профиль", "Регистрация"]} />
            <Unauthorized />
            <Footer />
        </div>
    )
}