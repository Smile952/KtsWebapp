import { Routes, Route } from "react-router";
import { AuthPage } from './pages/AuthPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { DevTypesPage } from './pages/DevTypesPage'
import { RequestPage } from './pages/RequestPage'
export function App() {
    return (
        <Routes>
            <Route path='autorize' element={<AuthPage />} />
            <Route path='registration' element={<RegistrationPage />} />
            <Route path='devTypes' element={<DevTypesPage />} />
            <Route path='/' element={<RequestPage />} />
        </Routes>
    );
}