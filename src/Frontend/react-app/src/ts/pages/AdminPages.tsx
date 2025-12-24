import { Admin } from "components/Admin/Admin";
import { AdminUsersAbout } from "components/Admin/Users/AdminUsersAbout/AdminUsersAbout";
import { AdminRequestsAbout } from "components/Admin/Requests/AdminRequestsAbout/AdminRequestsAbout";
import { AdminEmployeesAbout } from "components/Admin/Employees/AdminEmployeesAbout/AdminEmployeesAbout";
import { Page } from "./components/PageTemplate/Page";
import { Header } from "components/Header/Header";

export const AdmPage = <Page header={<Header title={'КТС-Администрация'} text={['Главная']} />} children={<Admin />}/>
export const AdmAboutUserPage = <Page header={<Header title={'КТС-Пользователь'} text={[ 'Админ-панель']} />} children={<AdminUsersAbout />}/>
export const AdmAboutRequestPage = <Page header={<Header title={'КТС-Заказ'} text={['Админ-панель']} />} children={<AdminRequestsAbout />}/>
export const AdmAboutEmployeePage = <Page header={<Header title={'КТС-Сотрудник'} text={[ 'Админ-панель']} />} children={<AdminEmployeesAbout />}/>