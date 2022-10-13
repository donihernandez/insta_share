import dbConnect from 'lib/db/dbConnect';
import User from 'models/User';
import bcrypt from 'bcrypt';

if (!process.env.CYPRESS_TEST_USER_EMAIL) {
    throw new Error('Please add your CYPRESS_TEST_USER_EMAIL to .env.local');
}

if (!process.env.CYPRESS_TEST_USER_PASSWORD) {
    throw new Error('Please add your CYPRESS_TEST_USER_PASSWORD to .env.local');
}

const email = process.env.CYPRESS_TEST_USER_EMAIL;
const password = process.env.CYPRESS_TEST_USER_PASSWORD;

const resetDB = async () => {
    await dbConnect();
    await User.remove();

    const hashedPassword = bcrypt.hash(password, 12);

    const newUser = new User({
        email,
        hashedPassword,
        username: 'doni',
    });
};

export { resetDB };
