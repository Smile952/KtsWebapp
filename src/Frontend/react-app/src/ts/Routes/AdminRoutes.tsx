import { CheckAuth } from "common/CheckAuth";
import { ACCESS_LEVELS } from "common/Constants/AccessLevels";
import { Routes } from "common/Constants/Routes";
import { RouteEntity } from "common/Entityes/Route/RouteEntity";
import { AdminEmployeeCreate } from "components/Admin/Employees/AdminEmployeeCreate/AdminEmployeeCreate";
import { AdminRequestCreate } from "components/Admin/Requests/AdminRequestCreate/AdminRequestCreate";
import { AdminUserCreate } from "components/Admin/Users/AdminUserCreate/AdminUserCreate";
import { AdmPage, AdmAboutUserPage, AdmAboutRequestPage, AdmAboutEmployeePage } from "ts/pages/AdminPages";

export const AdminRoutes: RouteEntity[] = [
    {
        path: Routes.ADMIN,
        element: <CheckAuth accessLevel={ACCESS_LEVELS.ADMIN}>
                    {AdmPage}
                 </CheckAuth>
    },

    {
        path: Routes.ADMIN_USER,
        element: <CheckAuth accessLevel={ACCESS_LEVELS.ADMIN}>
                    {AdmAboutUserPage}
                 </CheckAuth>
    },
    {
        path: Routes.ADMIN_USER_CREATE,
        element: <CheckAuth accessLevel={ACCESS_LEVELS.ADMIN}>
                    <AdminUserCreate />
                 </CheckAuth>
    },

    {
        path: Routes.ADMIN_EMPLOYEE,
        element: <CheckAuth accessLevel={ACCESS_LEVELS.ADMIN}>
                    {AdmAboutEmployeePage}
                 </CheckAuth>
    },
    {
        path: Routes.ADMIN_EMPLOYEE_CREATE,
        element: <CheckAuth accessLevel={ACCESS_LEVELS.ADMIN}>
                    <AdminEmployeeCreate />
                 </CheckAuth>
    },

    {
        path: Routes.ADMIN_ORDER,
        element: <CheckAuth accessLevel={ACCESS_LEVELS.ADMIN}>
                    {AdmAboutRequestPage}
                 </CheckAuth>
    },
    {
        path: Routes.ADMIN_ORDER_CREATE,
        element: <CheckAuth accessLevel={ACCESS_LEVELS.ADMIN}>
                    <AdminRequestCreate />
                 </CheckAuth>
    },
]