import User from 'models/User';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateForm } from '../../lib/auth';
import bcrypt from 'bcrypt';

interface ResponseData {
    error?: string;
    msg?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    // validate if it is a POST
    if (req.method !== 'POST') {
        return res
            .status(200)
            .json({ error: 'This API call only accepts POST methods' });
    }

    const { username, email, password } = req.body;

    const errorMessage = await validateForm(username, email, password);
    if (errorMessage) {
        return res.status(400).json(errorMessage as ResponseData);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
        email,
        hashedPassword,
        username,
    });

    newUser
        .save()
        .then(() =>
            res
                .status(200)
                .json({ msg: 'Successfuly created new User: ' + newUser }),
        )
        .catch((err: string) =>
            res.status(400).json({ error: "Error on '/api/register': " + err }),
        );
}
