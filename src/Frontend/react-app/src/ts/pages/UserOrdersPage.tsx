import { Footer } from "components/Footer/Footer";
import { Header } from "components/Header/Header";
import { UserOrders } from "components/UserOrders/UserOrders";
import { Page } from "./Page";

export function UserOrdersPage() {
    return <div>
        <Page header={<Header title={"КТС-МоиЗаявки"} text={["Главная"]} />} children={<UserOrders/>} />
    </div>
}