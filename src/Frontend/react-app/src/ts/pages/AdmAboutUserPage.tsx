import { AdminUsersAbout } from "../../components/Admin/Users/AdminUsersAbout/AdminUsersAbout";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

export function AdmAboutUserPage() {
    return (
        <div>
            <Header title={'КТС-Пользователь'} text={[ 'Админ-панель']} />
            <AdminUsersAbout />
            <Footer />
        </div>
    );
}
