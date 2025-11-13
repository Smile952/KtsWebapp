import { UnauthorizedPage } from '../ts/pages/UnauthorizedPage';
import axios from 'axios';
import { addrToApis, apiControllers } from './addr';
import { useState, useEffect } from 'react'
import { UserEntity } from './Entityes/UserEntity/UserEntity';


interface AuthProps {
    children: React.ReactNode;
    accessLevel: number;
}

export function CheckAuth({ children, accessLevel }: AuthProps) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        axios.create({
            baseURL: addrToApis,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }

        })
            .get(apiControllers.TokenController)
            .then((data) => {
                const user = localStorage.getItem('user')
                const userObject = JSON.parse(user as string) as UserEntity
                console.log(data)
                const level = userObject?.PermissionId || 0;
                setIsAuthorized(level >= accessLevel);
            })
            .catch(() => {
                setIsAuthorized(false);
            });
    }, [accessLevel]);

    //if (isAuthorized === null || isAuthorized === false) return <UnauthorizedPage />;
    return <>{children}</>;
}