import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Services } from "../../components/Services/Services";
import { JSX } from "react";

export function DevTypesPage(): JSX.Element {
    return (
        <div>
            <Header title={"КТС-Возможности"} text={["Портфолио", "Мои заявки", "Профиль"]} />
            <Services />
            <Footer />
        </div>
    );
}
