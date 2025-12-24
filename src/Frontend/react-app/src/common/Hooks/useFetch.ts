import { useEffect, useState } from "react";
import { FetchParams } from "../Entityes/FetchParams";


export function useFetch<T>({ params }: 
                            { params: FetchParams }): {data: T|null, isLoading: boolean, isTokenValid: boolean}{
    const [data, setData] = useState<T|null>({} as T);
    const [isLoading, setIsLoading] = useState<boolean>(true);    
    const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try{
                console.log(params)
                const request = await fetch(params.url, {
                    method: params.method,
                    headers: params.headers,
                    body: params.body ? JSON.stringify(params.body) : null,
                });
                
                console.log('Fetch response status: ', request.status);
                if(request.status == 401){
                    setData(null)
                    setIsLoading(false)
                    throw new Error(`Token is not valid`)
                }
                else if(!request.ok){
                    setData(null)
                    throw new Error(`Ошибка при запросе: ${request.statusText}`);
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
    
    return {data, isLoading, isTokenValid};
}