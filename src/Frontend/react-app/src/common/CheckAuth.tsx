import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { verifyToken, selectAuth } from '../store/slice';
import { UnauthorizedPage } from '../ts/pages/UnauthorizedPage';

interface AuthProps {
    children: React.ReactNode;
    accessLevel: number;
}

export function CheckAuth({ children, accessLevel }: AuthProps) {
    const dispatch = useAppDispatch();
    const { token, role, isLoading } = useAppSelector(selectAuth);

    useEffect(() => {
        dispatch(verifyToken());
    }, [dispatch]);

    if (isLoading) return <div>Loading...</div>;
    if (!token) return <UnauthorizedPage />;

    const permission = role ? parseInt(role) : -1;
    if (permission < accessLevel) return <UnauthorizedPage />;

    return <>{children}</>;
}