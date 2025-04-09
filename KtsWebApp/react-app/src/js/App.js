import { Routes, Route } from "react-router";
import { AuthPage } from './pages/AuthPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { DevTypesPage } from './pages/DevTypesPage'
import { RequestPage } from './pages/RequestPage'
import { DevAboutPage } from './pages/DevAboutPage'
import { AdmPage } from './pages/AdmPage'


export function App() {
    return (
        <Routes>
            <Route path='auth' element={<AuthPage />} />
            <Route path='registration' element={<RegistrationPage />} />
            <Route path='devtypes' element={<DevTypesPage />} />
            <Route path='request' element={<RequestPage />} />
            <Route path='about/:id' element={<DevAboutPage />} />
            <Route path='/' element={<AdmPage />} />
        </Routes>
    );
}