import { NextApiRequest, NextApiResponse } from 'next';

import { dbConnect } from 'lib';
import User from '../../../models/User';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    await dbConnect();

    const { email } = req.query;

    const user = await User.findOne({ email: email });

    if (!user) {
        res.status(404).json({
            message: 'User not found',
        });
    }

    res.status(200).json({
        files: user.files,
    });
}
