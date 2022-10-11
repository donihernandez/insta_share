import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import { AuthProvider } from 'context/AuthContext';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

function MyApp({ Component, pageProps }: AppProps) {
    const NO_AUTH_REQUIRED = ['/login', '/register'];
    const router = useRouter();

    return (
        <ChakraProvider>
            <AuthProvider>
                {NO_AUTH_REQUIRED.includes(router.pathname) ? (
                    <Component {...pageProps} />
                ) : (
                    <ProtectedRoute>
                        <Component {...pageProps} />
                    </ProtectedRoute>
                )}
            </AuthProvider>
        </ChakraProvider>
    );
}

export default MyApp;
