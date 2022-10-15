import { FC, useCallback, useEffect, useState } from 'react';

import { Container, Flex, Heading } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import { COLORS } from '@/styles/theme';
import { FileUpload } from '../FileUpload';
import { FilesList } from '../FilesList';
import { data } from 'cypress/types/jquery';

const Home: FC = () => {
    const { data: session } = useSession();
    const [files, setFiles] = useState([]);

    const getFiles = useCallback(async () => {
        if (session) {
            const { data } = await axios.get('/api/files/getFiles', {
                params: {
                    email: session?.user?.email,
                },
            });
            setFiles(data.files);
        }
    }, [files]);

    useEffect(() => {
        getFiles();
    }, [files]);

    return (
        <Flex bg="#000" direction="column" w="full">
            <Container h="full" maxW="4xl" minH="100vh" zIndex={555}>
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
                    <FilesList fileList={files} />
                </Flex>
            </Container>
        </Flex>
    );
};

export { Home };
