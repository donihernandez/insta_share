import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const useAuth = () => {
    const router = useRouter();

    const loginUser = async (email: string, password: string) => {
        const res: any = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
        });

        return res.error ? console.log(res.error) : redirectToHome();
    };

    const redirectToHome = () => {
        const { pathname } = router;
        if (pathname === '/login' || pathname === '/register') {
            router.push('/');
        }
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
