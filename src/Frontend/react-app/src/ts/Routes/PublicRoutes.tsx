import { RouteEntity } from "common/Entityes/Route/RouteEntity";
import { Routes } from "common/Constants/Routes";
import { HomePage, SignInPage, SignUpPage } from "ts/pages/PublicPages";
import { CheckAuth } from "common/CheckAuth";
import { ACCESS_LEVELS } from "common/Constants/AccessLevels";


export const PublicRoutes : RouteEntity[] = [
    {
            path: Routes.HOME,
            element: <CheckAuth accessLevel={ACCESS_LEVELS.PUBLIC}>
                        {HomePage}
                     </CheckAuth>
    },
    {
            path: Routes.SIGNIN,
            element: <CheckAuth accessLevel={ACCESS_LEVELS.PUBLIC}>
                        {SignInPage}
                     </CheckAuth>
    },
    {
            path: Routes.SIGNUP,
            element: <CheckAuth accessLevel={ACCESS_LEVELS.PUBLIC}>
                        {SignUpPage}
                     </CheckAuth>
    }
]