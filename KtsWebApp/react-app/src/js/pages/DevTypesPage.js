import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Blocks } from "../../components/Blocks/Blocks"

export function DevTypesPage() {
    return (
        <div>
            <Header text={["КТС-Возможности", "Главная", "Портфолио", "Контакты", "Профиль"]} />
            <Blocks />
            <Footer />
        </div>
    )
}