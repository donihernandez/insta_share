import type { FC } from 'react';
import {
    Box,
    Button,
    chakra,
    Link as ChakraLink,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Input,
    Text,
} from '@chakra-ui/react';
import Link from 'next/link';

import { COLORS } from '@/styles/theme';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useBreakpoints } from 'hooks';

const Register: FC = () => {
    const { isSmallerThanDesktop } = useBreakpoints();

    return (
        <Flex bg="black" h="100vh" w="full">
            {!isSmallerThanDesktop && (
                <Box h="100vh" w="50%">
                    <Image
                        alt="movies camera"
                        h="full"
                        objectFit="cover"
                        src="/images/register.jpg"
                        w="full"
                    />
                </Box>
            )}

            <Container h="100vh" px="50px" w="full">
                <Flex direction="column" h="full" justifyContent="center">
                    <Box mb="60px">
                        <Link href="/" passHref>
                            <ChakraLink>
                                <Text
                                    _hover={{ color: COLORS.orange }}
                                    color={COLORS.white}
                                    transition="all 0.3s ease-in"
                                >
                                    <chakra.span mr="10px">
                                        <ArrowBackIcon />
                                    </chakra.span>
                                    Back To Home
                                </Text>
                            </ChakraLink>
                        </Link>
                    </Box>

                    <Heading
                        as="h1"
                        color={COLORS.white}
                        fontSize="60px"
                        pb="100px"
                    >
                        Register
                    </Heading>

                    <chakra.form>
                        <FormControl mb="20px">
                            <FormLabel color={COLORS.white}>Username</FormLabel>
                            <Input
                                color={COLORS.white}
                                type="text"
                                variant="flushed"
                            />
                        </FormControl>
                        <FormControl mb="20px">
                            <FormLabel color={COLORS.white}>Email</FormLabel>
                            <Input
                                autoComplete="username"
                                color={COLORS.white}
                                type="email"
                                variant="flushed"
                            />
                        </FormControl>
                        <FormControl mb="20px">
                            <FormLabel color={COLORS.white}>Password</FormLabel>
                            <Input
                                autoComplete="current-password"
                                color={COLORS.white}
                                type="password"
                                variant="flushed"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel color={COLORS.white}>
                                Confirm Password
                            </FormLabel>
                            <Input
                                autoComplete="current-password"
                                color={COLORS.white}
                                type="password"
                                variant="flushed"
                            />
                        </FormControl>
                        <Button
                            _active={{
                                bg: 'transparent',
                                borderColor: COLORS.primary,
                            }}
                            _hover={{
                                bg: 'transparent',
                                borderColor: COLORS.orange,
                                color: COLORS.orange,
                            }}
                            border="3px solid"
                            borderColor={COLORS.white}
                            borderRadius="0"
                            color={COLORS.white}
                            fontSize={['14px', '18px']}
                            h="50px"
                            mt={['30px', '50px']}
                            transition="all 0.3s ease-in-out"
                            type="submit"
                            variant="outline"
                            w="full"
                        >
                            Register
                        </Button>
                    </chakra.form>

                    <Box mt="40px">
                        <Text
                            color={COLORS.white}
                            transition="all 0.3s ease-in"
                        >
                            {'Already have an accout?'}
                            <Link href="/login" passHref>
                                <ChakraLink>
                                    <chakra.span
                                        _hover={{
                                            color: COLORS.orange,
                                            textDecoration: 'none',
                                        }}
                                        ml="5px"
                                    >
                                        Log in
                                    </chakra.span>
                                </ChakraLink>
                            </Link>
                        </Text>
                    </Box>
                </Flex>
            </Container>
        </Flex>
    );
};

export { Register };
