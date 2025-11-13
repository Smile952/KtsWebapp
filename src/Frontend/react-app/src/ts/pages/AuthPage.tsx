import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Auth } from "../../components/Auth/Auth";

export function AuthPage() {
    return (
        <div>
            <Header title={"КТС-Авторизация"} text={['Главная']} />
            <Auth />
            <Footer />
        </div>
    )
}
