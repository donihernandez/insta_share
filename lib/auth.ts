import { compare, hash } from 'bcryptjs';
import User from 'models/User';
import dbConnect from './dbConnect';

const hashPassword = async (password: string) => {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
};

const verifyPassword = async (password: string, hashedPassword: string) => {
    const isValid = await compare(password, hashedPassword);
    return isValid;
};

const validateEmail = (email: string) => {
    const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regEx.test(email);
};

const validateForm = async (
    username: string,
    email: string,
    password: string,
) => {
    if (username.length < 3) {
        return { error: 'Username must have 3 or more characters' };
    }
    if (!validateEmail(email)) {
        return { error: 'Email is invalid' };
    }

    await dbConnect();
    const emailUser = await User.findOne({ email: email });

    if (emailUser) {
        return { error: 'Email already exists' };
    }

    if (password.length < 5) {
        return { error: 'Password must have 5 or more characters' };
    }

    return null;
};

export { validateEmail, verifyPassword, hashPassword, validateForm };
