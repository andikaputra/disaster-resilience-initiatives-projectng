import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return res.json({
            status: 'ok',
        });
    }
    return res.status(404).json({});
};

export default handler;
