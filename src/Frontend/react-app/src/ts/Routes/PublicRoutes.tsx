import { RouteEntity } from "common/Entityes/Route/RouteEntity";
import { Routes } from "common/Constants/Routes";
import { HomePage, SignInPage, SignUpPage } from "ts/pages/PublicPages";


export const PublicRoutes : RouteEntity[] = [
    {
        path: Routes.HOME,
        element: HomePage
    },
    {
        path: Routes.SIGNIN,
        element: SignInPage
    },
    {
        path: Routes.SIGNUP,
        element: SignUpPage
    }
]