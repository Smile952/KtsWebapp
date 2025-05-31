import { Routes, Route } from "react-router";
import { routesConfig } from "../common/routes";


export function App() {
    let filteredRoutes = [...routesConfig];

    return (
        <Routes>
            {filteredRoutes.map((rout) => (
                <Route key={rout.path} path={rout.path} element={rout.element} />
            ))}
        </Routes>
    );
}
