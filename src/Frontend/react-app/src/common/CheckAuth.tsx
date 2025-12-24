import { UnauthorizedPage } from '../ts/pages/PublicPages';
import { JSX } from 'react'
import { LoadingSpinner } from './LoadingSpinner';
import { useFetch } from './Hooks/useFetch';
import { FetchParams } from './Entityes/FetchParams';
import { apiControllers } from './Constants/addr';
import { UserEntity } from './Entityes/UserEntity/UserEntity';

export function CheckAuth({ children, accessLevel }: 
                          {children: JSX.Element; accessLevel: number}) : JSX.Element
{
    const token = localStorage.getItem('token')
    const params: FetchParams = {
        url: apiControllers.TokenController,
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }
    const {data, isLoading} = useFetch<boolean>({params});

    const user = localStorage.getItem('user')
    const userObject = JSON.parse(user as string) as UserEntity
    const level = userObject?.PermissionId || 0;

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!data && level >= accessLevel) {
        localStorage.clear();
        return <>{UnauthorizedPage}</>;
    }

    return <>{children}</>;
}