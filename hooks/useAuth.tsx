import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const useAuth = () => {
    const router = useRouter();

    const loginUser = async (email: string, password: string) => {
        await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
        }).catch(err => err.message);
    };

    const registerUser = async (
        username: string,
        email: string,
        password: string,
    ) => {
        const res = await axios
            .post(
                '/api/register',
                { email, password, username },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(async () => {
                await loginUser(email, password);
            })
            .catch(error => {
                return error;
            });
    };

    return {
        loginUser,
        registerUser,
    };
};

export { useAuth };
