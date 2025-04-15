import { Routes, Route } from "react-router";
import { AuthPage } from './pages/AuthPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { DevTypesPage } from './pages/DevTypesPage'
import { RequestPage } from './pages/RequestPage'
import { DevAboutPage } from './pages/DevAboutPage'
import { AdmPage } from './pages/AdmPage'
import { AdmAboutUserPage } from "./pages/AdmAboutUserPage";
import { AdmAboutEmployeePage } from "./pages/AdmAboutEmployeePage";
import { AdmAboutRequestPage } from "./pages/AdmAboutRequestPage";
import { AdminUserCreate } from "../components/Admin/Users/AdminUserCreate/AdminUserCreate";
import { AdminRequestCreate } from "../components/Admin/Requests/AdminRequestCreate/AdminRequestCreate";
import { AdminEmployeeCreate } from "../components/Admin/Employees/AdminEmployeeCreate/AdminEmployeeCreate";

export function App() {
    return (
        <Routes>
            <Route path='auth' element={<AuthPage />} />
            <Route path='registration' element={<RegistrationPage />} />
            <Route path='devtypes' element={<DevTypesPage />} />
            <Route path='request' element={<RequestPage />} />
            <Route path='about/:id' element={<DevAboutPage />} />
            <Route path='/' element={<AdmPage />} />
            <Route path='admin/user/:id' element={<AdmAboutUserPage />} />
            <Route path='admin/employee/:id' element={<AdmAboutEmployeePage />} />
            <Route path='admin/order/:id' element={<AdmAboutRequestPage />} />
            <Route path='admin/user/create' element={<AdminUserCreate />} />
            <Route path='admin/order/create' element={<AdminRequestCreate />} />
            <Route path='admin/employee/create' element={<AdminEmployeeCreate />} />
        </Routes>
    );
}