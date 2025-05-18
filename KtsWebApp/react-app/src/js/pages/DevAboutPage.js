import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Service } from "../../components/Service/Service"

export function DevAboutPage() {
    return (
        <div>
            <Header text={["КТС-Возможности", "Главная", "Портфолио", "Контакты", "Профиль"]} />
            <Service />
            <Footer />
        </div>
    )
}