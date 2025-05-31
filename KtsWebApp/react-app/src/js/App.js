import { Routes, Route } from "react-router";
import { routesConfig, ACCESS_LEVELS } from "../common/routes";
import { useState } from "react";


export function App() {
    const [token, setToken] = useState()
    const [role, setRole] = useState()

    let filteredRoutes = [...routesConfig];

    if (role === ACCESS_LEVELS.PUBLIC) {
        filteredRoutes = filteredRoutes.filter(r => r.access === ACCESS_LEVELS.PUBLIC);
    }
    else if (role === ACCESS_LEVELS.USER) {
        filteredRoutes = filteredRoutes.filter(r => r.access === ACCESS_LEVELS.PUBLIC || r.access === ACCESS_LEVELS.USER);
    }

    return (
        <Routes>
            {filteredRoutes.map((rout) => (
                <Route key={rout.path} path={rout.path} element={rout.element} />
            ))}
        </Routes>
    );
}
