import { Routes, Route } from "react-router";
import { AuthPage } from './pages/AuthPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { DevTypesPage } from './pages/DevTypesPage'
import { RequestPage } from './pages/RequestPage'
import { DevAboutPage } from './pages/DevAboutPage'


export function App() {
    return (
        <Routes>
            <Route path='auth' element={<AuthPage />} />
            <Route path='registration' element={<RegistrationPage />} />
            <Route path='/' element={<DevTypesPage />} />
            <Route path='request' element={<RequestPage />} />
            <Route path='about/:id' element={<DevAboutPage />} />
        </Routes>
    );
}