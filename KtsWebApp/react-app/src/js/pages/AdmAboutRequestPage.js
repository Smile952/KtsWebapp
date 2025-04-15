import { AdminRequestsAbout } from "../../components/Admin/Requests/AdminRequestsAbout/AdminRequestsAbout";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

export function AdmAboutRequestPage() {
    return (
        <div>
            <Header text={['КТС-Заказ']} />
            <AdminRequestsAbout />
            <Footer />
        </div>
    )
}