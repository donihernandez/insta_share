import { dbConnect } from 'lib';
import User from 'models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { image, session } = req.body;

    await dbConnect();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        res.status(404).json({
            message: 'User not found',
        });
    }
    const files = user.files;
    files.push(image);
    user.update(files);
    user.save();

    res.status(200).json({
        message: 'User updated successfully',
    });
}
