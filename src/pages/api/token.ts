import type { NextApiRequest, NextApiResponse } from 'next';

import Cookies from 'cookies';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const cookies = new Cookies(req, res);
        const accessToken = cookies.get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string);
        return res.json({
            token: accessToken,
        });
    }
    return res.status(404).json({});
};

export default handler;
