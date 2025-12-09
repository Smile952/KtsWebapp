import { Routes, Route } from "react-router";
import { JSX } from "react";
import { PublicRoutes } from "./Routes/PublicRoutes";
import { UserRoutes } from "./Routes/UserRoutes";
import { AdminRoutes } from "./Routes/AdminRoutes";


export function App(): JSX.Element {
    return (
        <Routes>
            {/* ===== Публичные маршруты ===== */}
            {
                PublicRoutes.map(p => (
                    <Route path={p.path} element={p.element} />
                ))
            }

            {/* ===== Приватные маршруты ===== */}
            {
                UserRoutes.map(u => (
                    <Route path={u.path} element={u.element}/>
                ))
            }

            {/* ===== Админские маршруты ===== */}
            {
                AdminRoutes.map(a => (
                    <Route path={a.path} element={a.element}/>
                ))
            }
        </Routes>
    );
}
