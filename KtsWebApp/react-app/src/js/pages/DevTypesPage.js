import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Block } from "../../components/Block/Block"

export function DevTypesPage() {
    return (
        <div>
            <Header text={["КТС-Возможности", "Главная", "Портфолио", "Контакты", "Профиль"]} />
            <Block />
            <Footer />
        </div>
    )
}