import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Request } from "../../components/Request/Request";
import { JSX } from "react";

export function RequestPage(): JSX.Element {

    return (
        <div>
            <Header text={["КТС-Заявка", "Главная", "Контакты", "Профиль"]} />
            <Request />
            <Footer />
        </div>
    );
}
