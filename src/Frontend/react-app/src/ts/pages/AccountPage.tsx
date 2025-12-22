import { Account } from "components/AccountBlock/Account";
import { Footer } from "components/Footer/Footer";
import { Header } from "components/Header/Header";

export function AccountPage() 
{
    return (
        <div>
            <Header title={"КТС-Аккаунт"} text={["Главная"]} />
            <Account />
            <Footer />
        </div>
    )
}