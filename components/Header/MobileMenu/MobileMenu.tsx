import type { FC } from 'react';
import { useRef } from 'react';
import Link from 'next/link';
import {
    Button,
    Link as ChakraLink,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    useDisclosure,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';

import { COLORS } from '@/styles/theme';

import { HamburguerButton } from './HamburgerButton';
import { useSessionStatus } from 'hooks/useSessionStatus';

const MobileMenu: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement>(null);

    const linkStyles = {
        _hover: {
            color: COLORS.orange,
            textDecoration: 'none',
        },
        color: COLORS.white,
        fontFamily: 'Nunito',
        fontSize: '25px',
        fontWeight: '600',
        textDecoration: 'none',
    };

    const { isLoggedIn } = useSessionStatus();

    return (
        <>
            <HamburguerButton onClick={onOpen} ref={btnRef} />
            <Drawer
                finalFocusRef={btnRef}
                isOpen={isOpen}
                onClose={onClose}
                placement="right"
            >
                <DrawerOverlay />
                <DrawerContent bg={COLORS.primary} zIndex="9999">
                    <DrawerCloseButton
                        color={COLORS.white}
                        padding="20px"
                        size="30px"
                    />
                    <DrawerHeader></DrawerHeader>
                    <DrawerBody>
                        <Flex
                            direction="column"
                            h="full"
                            justifyContent="space-between"
                        >
                            <Flex
                                alignItems="center"
                                direction="column"
                                h="full"
                                justifyContent="center"
                            >
                                {!isLoggedIn ? (
                                    <>
                                        <Link href="/login" passHref>
                                            <Button
                                                as={ChakraLink}
                                                mb="20px"
                                                textTransform="uppercase"
                                                variant="link"
                                                {...linkStyles}
                                            >
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href="/login" passHref>
                                            <Button
                                                as={ChakraLink}
                                                mb="20px"
                                                textTransform="uppercase"
                                                variant="link"
                                                {...linkStyles}
                                            >
                                                Register
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <Button
                                        mb="20px"
                                        onClick={() => signOut()}
                                        textTransform="uppercase"
                                        variant="link"
                                        {...linkStyles}
                                    >
                                        Logout
                                    </Button>
                                )}
                            </Flex>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export { MobileMenu };
