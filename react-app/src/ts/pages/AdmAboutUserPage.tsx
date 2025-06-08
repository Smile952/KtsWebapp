import { AdminUsersAbout } from "../../components/Admin/Users/AdminUsersAbout/AdminUsersAbout";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

export function AdmAboutUserPage() {
    return (
        <div>
            <Header text={['КТС-Пользователь', 'Админ-панель']} />
            <AdminUsersAbout />
            <Footer />
        </div>
    );
}
