import { dbConnect } from 'lib';
import User from '../../../models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    await dbConnect();

    const { email, file } = req.body;

    await User.updateOne(
        { email: email, 'files.name': file.originalName },
        { $pull: { files: file } },
    );
    res.status(200).json({
        message: 'File name updated sucessfully!',
    });
}
