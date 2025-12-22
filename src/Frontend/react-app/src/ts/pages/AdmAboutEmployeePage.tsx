import { AdminEmployeesAbout } from "../../components/Admin/Employees/AdminEmployeesAbout/AdminEmployeesAbout";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

export function AdmAboutEmployeePage() {
    return (
        <div>
            <Header title={'КТС-Сотрудник'} text={[ 'Админ-панель']} />
            <AdminEmployeesAbout />
            <Footer />
        </div>
    );
}
