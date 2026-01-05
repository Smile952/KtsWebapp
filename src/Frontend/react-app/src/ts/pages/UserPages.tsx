import { Header } from "components/Header/Header"
import { Page } from "./components/PageTemplate/Page"
import { UserOrders } from "components/UserOrders/UserOrders"
import { Service } from "components/Service/Service"
import { Request } from "components/Request/Request"

export const UserOrdersPage = <Page header={<Header title={"КТС-МоиЗаявки"} text={["Главная"]} />} children={<UserOrders/>} />
export const RequestPage = <Page header={<Header title={"КТС-Заявка"} text={["Главная", "Мои заявки", "Профиль"]} />} children={<Request />} />
export const DevAboutPage = <Page header={<Header title={"КТС-Возможности"} text={[ "Главная", "Мои заявки"]} />} children={<Service />}/>