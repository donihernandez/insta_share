import type { FC } from 'react';

import { Container, Flex, Heading } from '@chakra-ui/react';
import { COLORS } from '@/styles/theme';

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
                    <Heading as="h1" color={COLORS.white}>
                        Welcome to Insta Share
                    </Heading>
                </Flex>
            </Container>
        </Flex>
    );
};

export { Home };
