import { FC } from 'react';
import { Button, Flex } from '@chakra-ui/react';

import { COLORS } from '@/styles/theme';
import { signOut } from 'next-auth/react';

const Menu: FC = () => {
    return (
        <Flex alignItems="center" justifyContent="flex-end" w="full">
            <Flex alignItems="center">
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
            </Flex>
        </Flex>
    );
};

export { Menu };
