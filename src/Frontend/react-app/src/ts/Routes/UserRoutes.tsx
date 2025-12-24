import { CheckAuth } from "common/CheckAuth";
import { ACCESS_LEVELS } from "common/Constants/AccessLevels";
import { RouteEntity } from "common/Entityes/Route/RouteEntity";
import { Routes } from "common/Constants/Routes";
import {RequestPage, DevAboutPage, UserOrdersPage} from "ts/pages/UserPages";

export const UserRoutes: RouteEntity[] = 
[
    {
        path: Routes.REQUEST, 
        element: <CheckAuth accessLevel={ACCESS_LEVELS.USER}>
                    {RequestPage}
                 </CheckAuth>
    },
    {
        path: Routes.DEV_ABOUT, 
        element: <CheckAuth accessLevel={ACCESS_LEVELS.USER}>
                    {DevAboutPage}
                 </CheckAuth>
    },
    {
        path: Routes.USER_ORDERS, 
        element: <CheckAuth accessLevel={ACCESS_LEVELS.USER}>
                    {UserOrdersPage}
                 </CheckAuth>
    }
]