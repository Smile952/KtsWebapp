import { Footer } from "components/Footer/Footer";
import { Header } from "components/Header/Header";
import { Orders } from "components/Orders/Orders";

export function OrdersPage() {
    return <div>
        <Header title={"КТС-МоиЗаявки"} text={["Главная"]} />
        <Orders />
        <Footer />
    </div>
}