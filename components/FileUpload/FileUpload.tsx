import {
    Box,
    Button,
    chakra,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Progress,
    Text,
} from '@chakra-ui/react';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { ImFolderUpload } from 'react-icons/im';

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'lib/firebase';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';

import { COLORS } from '@/styles/theme';

import User from 'models/User';
import { async } from '@firebase/util';
import { dbConnect } from 'lib';
import axios from 'axios';

const FileUpload: FC = () => {
    const [progressPercent, setProgressPercent] = useState(0);
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<any>(null);

    const { data: session } = useSession();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const file = e.target[0]?.files[0];

        if (!file) {
            return;
        }

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot: any) => {
                setUploading(true);
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                );
                setProgressPercent(progress);
            },
            (error: any) => {
                Swal.fire({
                    icon: 'error',
                    text: error,
                    title: 'Oops...',
                });
            },
            () => {
                Swal.fire({
                    icon: 'success',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    title: 'Your work has been saved',
                });
                getDownloadURL(uploadTask.snapshot.ref).then(
                    async (downloadURL: string) => {
                        const image = {
                            name: file.name,
                            size: file.size,
                            url: downloadURL,
                        };

                        await axios.post('/api/upload', {
                            image,
                            session,
                        });
                    },
                );
                setUploading(false);
                setProgressPercent(0);
                inputRef.current.value = null;
            },
        );
    };

    return (
        <Box mt="30px">
            <chakra.form onSubmit={handleSubmit}>
                <Flex alignItems="center">
                    <FormControl>
                        <Input
                            color={COLORS.white}
                            ref={inputRef}
                            type="file"
                            variant="flushed"
                        />
                    </FormControl>
                    <Button
                        colorScheme="blue"
                        leftIcon={<ImFolderUpload />}
                        ml="10px"
                        type="submit"
                    >
                        Upload
                    </Button>
                </Flex>
            </chakra.form>

            {uploading && <Progress mt="15px" value={progressPercent} />}
        </Box>
    );
};

export { FileUpload };
