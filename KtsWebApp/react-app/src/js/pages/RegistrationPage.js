import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Registration } from "../../components/Registration/Registration"
export function RegistrationPage() {
    return (
        <div>
            <Header text={["КТС-Регистрация"]} />
            <Registration />
            <Footer />
        </div>
    )
}