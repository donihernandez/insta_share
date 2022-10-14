import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConnect } from 'lib/db';
import User from 'models/User';
import { compare } from 'bcryptjs';

const credentials: any = {
    email: {
        label: 'email',
        type: 'text',
    },
    password: { label: 'Password', type: 'password' },
};

export default NextAuth({
    debug: process.env.NODE_ENV === 'development',
    jwt: {
        secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    },
    pages: {
        signIn: '/auth/signin',
    },
    providers: [
        // Email & Password
        CredentialsProvider({
            async authorize(credentials) {
                await dbConnect();

                // Find user with the email
                const user = await User.findOne({
                    email: credentials?.email,
                });

                // Email Not found
                if (!user) {
                    throw new Error('Email is not registered');
                }

                const isPasswordCorrect = await compare(
                    credentials!.password,
                    user.hashedPassword,
                );

                // Incorrect password
                if (!isPasswordCorrect) {
                    throw new Error('Password is incorrect');
                }

                return user;
            },
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            name: 'Credentials',
            type: 'credentials',
        }),
    ],
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
});
