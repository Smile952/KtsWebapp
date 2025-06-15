import { UnauthorizedPage } from '../ts/pages/UnauthorizedPage';
import axios from 'axios';
import { apiControllers } from './addr';
import { useState, useEffect } from 'react'

interface AuthProps {
    children: React.ReactNode;
    accessLevel: number;
}

export function CheckAuth({ children, accessLevel }: AuthProps) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        axios.get(apiControllers.TokenController)
            .then(() => {
                const level = parseInt(localStorage.getItem('accessLevel') || '0');
                setIsAuthorized(level >= accessLevel);
            })
            .catch(() => {
                setIsAuthorized(false);
            });
    }, [accessLevel]);

    if (isAuthorized === null) {
        return <UnauthorizedPage />;
    }

    return isAuthorized ? <>{children}</> : <UnauthorizedPage />;
}