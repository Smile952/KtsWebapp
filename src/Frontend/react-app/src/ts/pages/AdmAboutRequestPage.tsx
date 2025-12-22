import { AdminRequestsAbout } from "../../components/Admin/Requests/AdminRequestsAbout/AdminRequestsAbout";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
export function AdmAboutRequestPage() {
    return (
        <div>
            <Header title={'КТС-Заказ'} text={['Админ-панель']} />
            <AdminRequestsAbout />
            <Footer />
        </div>
    );
}
