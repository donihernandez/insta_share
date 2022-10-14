import { FC, useEffect, useState } from 'react';
import {
    Button,
    Link as ChakraLink,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { COLORS } from '@/styles/theme';
import { signOut } from 'next-auth/react';
import { useSessionStatus } from 'hooks/useSessionStatus';

const DesktopMenu: FC = () => {
    const linkStyles = {
        _hover: {
            color: '#ef8354',
            textDecoration: 'none',
        },
        color: '#ffffff',
        fontFamily: 'Nunito',
        fontSize: '18px',
        fontWeight: '600',
        mr: '20px',
        textDecoration: 'none',
    };

    const { isLoggedIn } = useSessionStatus();

    return (
        <Flex alignItems="center" justifyContent="space-between" w="full">
            <Flex alignItems="center">
                {!isLoggedIn ? (
                    <>
                        <Link href="/login" passHref>
                            <ChakraLink {...linkStyles}>Login</ChakraLink>
                        </Link>
                        <Link href="/register" passHref>
                            <Button
                                _hover={{
                                    bg: 'transparent',
                                    borderColor: COLORS.orange,
                                    color: COLORS.orange,
                                    textDecoration: 'none',
                                }}
                                as={ChakraLink}
                                border="3px solid"
                                borderColor={COLORS.white}
                                borderRadius="0"
                                color={COLORS.white}
                                fontSize={['14px', '18px']}
                                transition="all 0.3s ease-in-out"
                                variant="outline"
                                w="full"
                            >
                                Register
                            </Button>
                        </Link>
                    </>
                ) : (
                    <Button
                        _hover={{
                            bg: 'transparent',
                            borderColor: COLORS.orange,
                            color: COLORS.orange,
                            textDecoration: 'none',
                        }}
                        border="3px solid"
                        borderColor={COLORS.white}
                        borderRadius="0"
                        color={COLORS.white}
                        fontSize={['14px', '18px']}
                        onClick={() => signOut()}
                        transition="all 0.3s ease-in-out"
                        variant="outline"
                        w="full"
                    >
                        Logout
                    </Button>
                )}
            </Flex>
        </Flex>
    );
};

export { DesktopMenu };
