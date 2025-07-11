import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Auth } from "../../components/Auth/Auth";

export function AuthPage() {
    return (
        <div>
            <Header text={["КТС-Авторизация", 'Главная', 'Регистрация']} />
            <Auth />
            <Footer />
        </div>
    )
}
