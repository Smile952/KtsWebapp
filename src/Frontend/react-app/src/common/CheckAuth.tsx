import { UnauthorizedPage } from '../ts/pages/UnauthorizedPage';
import axios from 'axios';
import { addrToApis, apiControllers } from './addr';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { tokenSelector, userSelector } from 'store/authSlice';

interface AuthProps {
    children: React.ReactNode;
    accessLevel: number;
}

export function CheckAuth({ children, accessLevel }: AuthProps) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    const user = useSelector(userSelector)
    const token = useSelector(tokenSelector)

    console.log(user)

    useEffect(() => {
        axios.create({
            baseURL: addrToApis,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .get(apiControllers.TokenController)
            .then(() => {
                const level = user?.permissionId || 0;
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