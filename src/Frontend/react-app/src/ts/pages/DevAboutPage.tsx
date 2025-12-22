import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Service } from "../../components/Service/Service";
export function DevAboutPage() {

    return (
        <div>
            <Header title={"КТС-Возможности"} text={[ "Главная", "Мои заявки"]} />
            <Service />
            <Footer />
        </div>
    );
}
