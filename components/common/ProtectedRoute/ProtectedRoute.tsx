import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSessionStatus } from 'hooks/useSessionStatus';

interface IProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
    const router = useRouter();
    const { isLoggedIn } = useSessionStatus();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push(
                `/auth/signin?callbackUrl=${router.asPath}`,
                undefined,
                {
                    shallow: true,
                },
            );
        }
    }, [isLoggedIn, router]);

    return <>{children}</>;
};

export { ProtectedRoute };
