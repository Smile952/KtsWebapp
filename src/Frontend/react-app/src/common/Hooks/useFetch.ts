import { useEffect, useState } from "react";
import { FetchParams } from "../Entityes/FetchParams";
import { HttpStatusCode } from "axios";


export function useFetch<T>([ params ] : 
                            [ params: FetchParams ]): [data: T|null, isLoading: boolean, isTokenValid: boolean]{

    const [data, setData] = useState<T|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);    
    const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try{
                const request = await fetch(params.url, params.init);
                if(request.status === HttpStatusCode.Unauthorized){
                    setData(null)
                    setIsLoading(false)
                    setIsTokenValid(false)
                    localStorage.clear();
                    throw new Error(`Token is not valid`)
                }                
                else if(!request.ok){
                    setData(null)
                    setIsLoading(false)
                    setIsTokenValid(false)
                    throw new Error(`Ошибка при запросе: ${request.statusText}`);
                }
                else if (request.status === HttpStatusCode.NoContent){
                    setData(null)
                    setIsLoading(false)
                    setIsTokenValid(true)
                }
                else {
                    const response: T = await request.json()
                    setData(response as T)
                    setIsLoading(false);
                    setIsTokenValid(true)
                }
            }
            catch (error) {
                console.error('Fetch error: ', error);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])
    
    return [data, isLoading, isTokenValid];
}