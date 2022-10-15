import { FC, useState } from 'react';

import { Container, Flex, Heading } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

import { COLORS } from '@/styles/theme';
import { FileUpload } from '../FileUpload';

const Home: FC = () => {
    return (
        <Flex bg="#000" direction="column" w="full">
            <Container
                h="full"
                maxW={{ base: '300vw', lg: '80vw' }}
                minH="100vh"
                zIndex={555}
            >
                <Flex
                    alignItems="center"
                    direction="column"
                    justifyContent="space-between"
                    m="200px 0 40px 0"
                    w="full"
                >
                    <Heading
                        as="h1"
                        color={COLORS.white}
                        textTransform="uppercase"
                    >
                        Welcome to Insta Share
                    </Heading>
                    <FileUpload />
                </Flex>
            </Container>
        </Flex>
    );
};

export { Home };
