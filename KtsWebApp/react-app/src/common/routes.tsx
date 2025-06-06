import { AdmAboutEmployeePage } from "../js/pages/AdmAboutEmployeePage";
import { AdmAboutRequestPage } from "../js/pages/AdmAboutRequestPage";
import { AdmAboutUserPage } from "../js/pages/AdmAboutUserPage";
import { AdmPage } from "../js/pages/AdmPage";
import { AdminUserCreate } from "../components/Admin/Users/AdminUserCreate/AdminUserCreate";
import { AdminEmployeeCreate } from "../components/Admin/Employees/AdminEmployeeCreate/AdminEmployeeCreate";
import { AdminRequestCreate } from "../components/Admin/Requests/AdminRequestCreate/AdminRequestCreate";
import { AuthPage } from "../js/pages/AuthPage";
import { DevAboutPage } from "../js/pages/DevAboutPage";
import { DevTypesPage } from "../js/pages/DevTypesPage";
import { RegistrationPage } from "../js/pages/RegistrationPage";
import { RequestPage } from "../js/pages/RequestPage";
import { JSX } from "react";

export const ACCESS_LEVELS = {
    PUBLIC: 1,
    USER: 2,
    ADMIN: 3,
} as const;

type AccessLevel = typeof ACCESS_LEVELS[keyof typeof ACCESS_LEVELS];

interface RouteConfig {
    path: string;
    element: JSX.Element;
    access: AccessLevel;
    exact?: boolean;
}

export const routesConfig: RouteConfig[] = [
    // ===== Публичные маршруты =====
    {
        path: '/',
        element: <DevTypesPage />,
        access: ACCESS_LEVELS.PUBLIC,
        exact: true,
    },
    {
        path: '/signin',
        element: <AuthPage />,
        access: ACCESS_LEVELS.PUBLIC,
    },
    {
        path: '/signup',
        element: <RegistrationPage />,
        access: ACCESS_LEVELS.PUBLIC,
    },

    // ===== Приватные маршруты =====
    {
        path: '/request',
        element: <RequestPage />,
        access: ACCESS_LEVELS.USER,
    },
    {
        path: '/about/:id',
        element: <DevAboutPage />,
        access: ACCESS_LEVELS.USER,
    },

    // ===== Админские маршруты =====
    {
        path: '/admin',
        element: <AdmPage />,
        access: ACCESS_LEVELS.ADMIN,
        exact: true,
    },
    {
        path: '/admin/user/:id/*',
        element: <AdmAboutUserPage />,
        access: ACCESS_LEVELS.ADMIN,
    },
    {
        path: '/admin/user/create',
        element: <AdminUserCreate />,
        access: ACCESS_LEVELS.ADMIN,
    },
    {
        path: '/admin/employee/:id/*',
        element: <AdmAboutEmployeePage />,
        access: ACCESS_LEVELS.ADMIN,
    },
    {
        path: '/admin/employee/create',
        element: <AdminEmployeeCreate />,
        access: ACCESS_LEVELS.ADMIN,
    },
    {
        path: '/admin/order/:id',
        element: <AdmAboutRequestPage />,
        access: ACCESS_LEVELS.ADMIN,
    },
    {
        path: '/admin/order/create',
        element: <AdminRequestCreate />,
        access: ACCESS_LEVELS.ADMIN,
    },
];
