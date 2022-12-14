import type { FC } from 'react';
import { Header } from '@/components/Header';

interface ILayoutProps {
    children: JSX.Element;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export { Layout };
