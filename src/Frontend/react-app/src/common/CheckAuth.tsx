import { UnauthorizedPage } from '../ts/pages/PublicPages';
import { JSX } from 'react'
import { LoadingSpinner } from './LoadingSpinner';
import { useFetch } from './Hooks/useFetch';
import { FetchParams } from './Entityes/FetchParams';
import { apiControllers } from './Constants/addr';
import { UserDataAndTokenStore } from 'store/store';
import { UserEntity } from './Entityes/UserEntity/UserEntity';
import { ACCESS_LEVELS } from './Constants/AccessLevels';

export function CheckAuth({ children, accessLevel }: 
                          { children: JSX.Element; accessLevel: number }) : JSX.Element{

    const userStore = UserDataAndTokenStore.getState().UserEntity
    const token = userStore.token;
    const userPermissions = userStore.permissionId

    const init: RequestInit = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
    }

    const params: FetchParams = {
        url: apiControllers.TokenController,
        init: init
      }
      
    const [data, isLoading, isTokenValid] = useFetch<boolean>([params]);

    if (isLoading) {
        return <LoadingSpinner />;
    }
    if(accessLevel !== ACCESS_LEVELS.PUBLIC){
        if (!isTokenValid || accessLevel > userPermissions) {
            UserDataAndTokenStore.getState().UserEntity = {} as UserEntity;
            return <>{UnauthorizedPage}</>;
        }
    }

    return <>{children}</>;
}