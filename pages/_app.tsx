import type { AppProps } from 'next/app';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

import '../styles/globals.css';

function MyApp({
    Component,
    pageProps,
}: AppProps<{
    session: Session;
}>) {
    return (
        <SessionProvider session={pageProps.session}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </SessionProvider>
    );
}

export default MyApp;
