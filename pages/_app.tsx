import type { AppInitialProps, AppProps } from 'next/app';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

import '../styles/globals.css';
import { Router } from 'next/router';
import { NextComponentType } from 'next';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { Layout } from '@/components/common/Layout';

type ComponentWithAuth = NextComponentType & { auth: boolean };
interface AppPropsWithAuth extends AppInitialProps {
    Component: ComponentWithAuth;
    router: Router;
    session: Session;
}
function MyApp({ Component, pageProps }: AppPropsWithAuth) {
    return (
        <SessionProvider session={pageProps.session}>
            <ChakraProvider>
                {Component.auth ? (
                    <Layout>
                        <ProtectedRoute>
                            <Component {...pageProps} />
                        </ProtectedRoute>
                    </Layout>
                ) : (
                    <Component {...pageProps} />
                )}
            </ChakraProvider>
        </SessionProvider>
    );
}

export default MyApp;
