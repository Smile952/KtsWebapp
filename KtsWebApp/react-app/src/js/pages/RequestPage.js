import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Request } from "../../components/Request/Request";

export function RequestPage() {
    return (
        <div>
            <Header text={["КТС-Заявка", "Услуги", "Портфолио", "Контакты", "Профиль"]} />
            <Request />
            <Footer />
        </div>
    )
}