import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from 'context/AuthContext';

interface IProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [router, user]);

    return <>{user ? children : null}</>;
};

export { ProtectedRoute };
