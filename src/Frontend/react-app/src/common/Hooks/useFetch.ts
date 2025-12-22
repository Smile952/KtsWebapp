import { useEffect, useState } from "react";
import { FetchParams } from "../Entityes/FetchParams";


export function useFetch<T>({ params }: 
                            { params: FetchParams }): {data: T, isLoading: boolean}{
    const [data, setData] = useState<T>({} as T);
    const [isLoading, setIsLoading] = useState<boolean>(true);    

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try{
                const request = await fetch(params.url, {
                    method: params.method,
                    headers: params.headers,
                    body: params.body ? JSON.stringify(params.body) : null,
                });
                console.log('Fetch response status: ', request.json());
                if(!request.ok){
                    setData(false as T)
                    setIsLoading(false);
                    throw new Error(`Ошибка при запросе: ${request.statusText}`);
                }
                else {
                    setData(true as T)
                    setIsLoading(false);
                }
            }
            catch (error) {
                console.error('Fetch error: ', error);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])
    
    return {data, isLoading};
}