import { FC, KeyboardEvent, useState } from 'react';

import {
    Flex,
    FormControl,
    FormHelperText,
    Icon,
    Input,
    Kbd,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

import { ImBin, ImFileZip, ImFolderDownload, ImPencil2 } from 'react-icons/im';
import { COLORS } from '@/styles/theme';
import axios from 'axios';
import Swal from 'sweetalert2';

interface IFileList {
    fileList: {
        name: string;
        size: number;
        url: string;
    }[];
}

const FilesList: FC<IFileList> = ({ fileList }) => {
    const iconStyles = {
        _hover: {
            color: COLORS.orange,
        },
        color: COLORS.white,
        cursor: 'pointer',
    };

    const colorStyle = {
        color: COLORS.white,
    };

    const [isEditing, setIsEditing] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const { data: session } = useSession();

    const selectFileToEditName = (name: string) => {
        if (!isEditing) {
            setIsEditing(true);
            setNewFileName(name);
        } else {
            setIsEditing(false);
            setNewFileName('');
        }
    };

    const handleChangeName = async (
        e: KeyboardEvent<HTMLInputElement>,
        originalName: string,
    ) => {
        if (e.key.toLowerCase() === 'enter') {
            e.preventDefault();

            if (session) {
                try {
                    const { data } = await axios.post(
                        '/api/files/editFileName',
                        {
                            email: session.user?.email,
                            name: newFileName,
                            originalName,
                        },
                    );

                    if (data) {
                        Swal.fire({
                            icon: 'success',
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 1500,
                            title: data.message,
                        });
                    }
                } catch (e: any) {
                    Swal.fire({
                        confirmButtonColor: COLORS.primary,
                        icon: 'error',
                        showConfirmButton: true,
                        text: e.message,
                        title: 'Oops...',
                    });
                }

                setIsEditing(false);
            }
        }
    };

    const renderEditName = (name: string) => {
        return (
            <FormControl>
                <Input
                    onChange={e => setNewFileName(e.target.value)}
                    onKeyPress={e => handleChangeName(e, name)}
                    type="text"
                    value={newFileName}
                />
                <FormHelperText color={COLORS.white}>
                    Press <Kbd bg="#000">Enter</Kbd> to Edit
                </FormHelperText>
            </FormControl>
        );
    };

    return fileList.length > 0 ? (
        <TableContainer mt="60px" w="full">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th {...colorStyle}>File Name</Th>
                        <Th {...colorStyle}>File Size</Th>
                        <Th {...colorStyle}>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {fileList.map((file, index) => {
                        return (
                            <Tr key={index}>
                                <Td {...colorStyle}>
                                    {isEditing ? (
                                        renderEditName(file.name)
                                    ) : (
                                        <Text>{file.name}</Text>
                                    )}
                                </Td>
                                <Td {...colorStyle}>{file.size}</Td>
                                <Td {...colorStyle}>
                                    <Flex
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Icon
                                            as={ImPencil2}
                                            onClick={() =>
                                                selectFileToEditName(file.name)
                                            }
                                            {...iconStyles}
                                        />
                                        <Icon
                                            as={ImFolderDownload}
                                            {...iconStyles}
                                        />
                                        <Icon as={ImFileZip} {...iconStyles} />
                                        <Icon as={ImBin} {...iconStyles} />
                                    </Flex>
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    ) : null;
};

export { FilesList };
