import { Routes, Route } from "react-router";
import { routesConfig, ACCESS_LEVELS } from "../common/routes";
import { JSX, useState } from "react";

type RoleType = typeof ACCESS_LEVELS[keyof typeof ACCESS_LEVELS]; // тип роли из ACCESS_LEVELS

export function App(): JSX.Element {
    const [token, setToken] = useState<string | undefined>(undefined);
    const [role, setRole] = useState<RoleType | undefined>(undefined);

    let filteredRoutes = [...routesConfig];

    if (role === ACCESS_LEVELS.PUBLIC) {
        filteredRoutes = filteredRoutes.filter(r => r.access === ACCESS_LEVELS.PUBLIC);
    } else if (role === ACCESS_LEVELS.USER) {
        filteredRoutes = filteredRoutes.filter(r =>
            r.access === ACCESS_LEVELS.PUBLIC || r.access === ACCESS_LEVELS.USER
        );
    }

    return (
        <Routes>
            {filteredRoutes.map((rout) => (
                <Route key={rout.path} path={rout.path} element={rout.element} />
            ))}
        </Routes>
    );
}
