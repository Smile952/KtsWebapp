import { UnauthorizedPage } from '../ts/pages/PublicPages';
import { useState, useEffect } from 'react'
import { SynchronizeToken } from './SynchronizeToken';
import { LoadingSpinner } from './LoadingSpinner';

export function CheckAuth({ children, accessLevel }: 
                          {children: React.ReactNode; accessLevel: number}) 
    {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        (async () => {
            setIsAuthorized(await SynchronizeToken({ accessLevel }));
            setIsLoading(false);
        })();

    }, [accessLevel]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    // if (!isAuthorized) {
    //     localStorage.clear();
    //     return <UnauthorizedPage />;
    // }

    return <>{children}</>;
}