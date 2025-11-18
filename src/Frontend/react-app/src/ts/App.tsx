import { Routes, Route } from "react-router";
import { ACCESS_LEVELS } from "../common/AccessLevels";
import { JSX } from "react";
import { DevTypesPage } from "./pages/DevTypesPage";
import { AuthPage } from "./pages/AuthPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { RequestPage } from "./pages/RequestPage";
import { DevAboutPage } from "./pages/DevAboutPage";
import { AdmPage } from "./pages/AdmPage";
import { AdmAboutUserPage } from "./pages/AdmAboutUserPage";
import { AdminUserCreate } from "components/Admin/Users/AdminUserCreate/AdminUserCreate";
import { AdminEmployeeCreate } from "components/Admin/Employees/AdminEmployeeCreate/AdminEmployeeCreate";
import { AdmAboutRequestPage } from "./pages/AdmAboutRequestPage";
import { AdminRequestCreate } from "components/Admin/Requests/AdminRequestCreate/AdminRequestCreate";
import { AdmAboutEmployeePage } from "./pages/AdmAboutEmployeePage";
import { CheckAuth } from "../common/CheckAuth";
import { OrdersPage } from "./pages/OrdersPage";
import { AccountPage } from "./pages/AccountPage";


export function App(): JSX.Element {
    return (
        <Routes>
            {/* ===== Публичные маршруты ===== */}
            <Route path="/" element={<DevTypesPage />} />
            <Route path="/signin" element={<AuthPage />} />
            <Route path="/signup" element={<RegistrationPage />} />

            {/* ===== Приватные маршруты ===== */}
            <Route path="/request" element={
                <CheckAuth accessLevel={ACCESS_LEVELS.USER}>
                    <RequestPage />
                </CheckAuth>
            } />
            <Route path="/about/:id" element={
                <CheckAuth accessLevel={ACCESS_LEVELS.USER}>
                    <DevAboutPage />
                </CheckAuth>
            } />
            <Route path="/user-orders" element={
                <CheckAuth accessLevel={ACCESS_LEVELS.USER}>
                    <OrdersPage />
                </CheckAuth>
            } />
            <Route path="/account" element={
                <CheckAuth accessLevel={ACCESS_LEVELS.USER}>
                    <AccountPage />
                </CheckAuth>
            } />

            {/* ===== Админские маршруты ===== */}
            <Route path="/admin" element={
                <CheckAuth accessLevel={ACCESS_LEVELS.ADMIN}>
                    <AdmPage />
                </CheckAuth>
            } />
            <Route path="/admin/user/:id/*" element={
                <CheckAuth accessLevel={ACCESS_LEVELS.ADMIN}>
                    <AdmAboutUserPage />
                </CheckAuth>
            } />
            <Route path="/admin/user/create" element={
                <CheckAuth accessLevel={ACCESS_LEVELS.ADMIN}>
                    <AdminUserCreate />
                </CheckAuth>
            } />
            <Route path="/admin/employee/:id/*" element={
                <CheckAuth accessLevel={ACCESS_LEVELS.ADMIN}>
                    <AdmAboutEmployeePage />
                </CheckAuth>
            } />
            <Route path="/admin/employee/create" element={
                <CheckAuth accessLevel={ACCESS_LEVELS.ADMIN}>
                    <AdminEmployeeCreate />
                </CheckAuth>
            } />
            <Route path="/admin/order/:id" element={
                <CheckAuth accessLevel={ACCESS_LEVELS.ADMIN}>
                    <AdmAboutRequestPage />
                </CheckAuth>
            } />
            <Route path="/admin/order/create" element={
                <CheckAuth accessLevel={ACCESS_LEVELS.ADMIN}>
                    <AdminRequestCreate />
                </CheckAuth>
            } />
        </Routes>
    );
}
