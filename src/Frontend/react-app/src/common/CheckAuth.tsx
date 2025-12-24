import { UnauthorizedPage } from '../ts/pages/PublicPages';
import { JSX } from 'react'
import { LoadingSpinner } from './LoadingSpinner';
import { useFetch } from './Hooks/useFetch';
import { FetchParams } from './Entityes/FetchParams';
import { apiControllers } from './Constants/addr';

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
      
    const {data, isLoading, isTokenValid} = useFetch<boolean>({params});   
    
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isTokenValid) {
        return <>{UnauthorizedPage}</>;
    }

    return <>{children}</>;
}