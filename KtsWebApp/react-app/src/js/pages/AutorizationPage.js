import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Autorization } from "../../components/Autorization/Autorization";

export function AutorizationPage() {
    return (
        <div>
            <Header text={["КТС-Авторизация"]} />
            <Autorization />
            <Footer />
        </div>
    )
}