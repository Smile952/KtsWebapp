import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Services } from "../../components/Services/Services"

export function DevTypesPage() {
    return (
        <div>
            <Header text={["КТС-Возможности", "Главная", "Портфолио", "Контакты", "Профиль"]} />
            <Services />
            <Footer />
        </div>
    )
}