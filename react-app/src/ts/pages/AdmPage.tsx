import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Admin } from '../../components/Admin/Admin';

export function AdmPage() {
    return (
        <div>
            <Header text={['КТС-Администрация', 'Главная']} />
            <Admin />
            <Footer />
        </div>
    );
}
