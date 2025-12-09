import { Header } from "components/Header/Header";
import { Page } from "./components/PageTemplate/Page";
import { Services } from "components/Services/Services";
import { Auth } from "components/Auth/Auth";
import { Registration } from "components/Registration/Registration";
import { Unauthorized } from "components/Unauthorized/Unauthorized";

export const HomePage = <Page header={<Header title={"КТС-Возможности"} text={["Портфолио", "Мои заявки", "Профиль"]} />} children={<Services />}/>
export const SignInPage = <Page header={<Header title={"КТС-Авторизация"} text={['Главная']} />} children={<Auth />} />
export const SignUpPage = <Page header={<Header title={"КТС-Регистрация"} text={["Главная"]} />} children={<Registration />} /> 
export const UnauthorizedPage = <Page header={<Header title={"КТС-Доступ запрещен"} text={["Главная"]} />} children={<Unauthorized/>} />