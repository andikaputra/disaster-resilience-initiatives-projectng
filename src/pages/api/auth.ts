import axios from 'axios';
import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthEntity } from '@/src/shared/domain/entities';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string);

    if (!accessToken) {
      try {
        const response = await axios.post<AuthEntity>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth/token`,
          {
            grant_type: 'client_credentials',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            scope: '*',
          }
        );
        return res.json({
          success: true,
          data: response.data,
        });
      } catch (error: any) {
        return res.status(500).json({
          success: false,
          message: error?.response?.data?.message ?? error?.message,
        });
      }
    }

    return res.json({
      success: true,
      data: {
        access_token: accessToken,
        expires_in: undefined,
      } as AuthEntity,
    });
  }
  return res.status(404).json({});
};

export default handler;
