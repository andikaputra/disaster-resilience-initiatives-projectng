import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { NextPageContext } from 'next';
import { AuthEntity } from '@/src/shared/domain/entities';

// eslint-disable-next-line import/no-mutable-exports
let requestContext: NextPageContext;

const setRequestContext = (ctx: NextPageContext) => {
    requestContext = ctx;
};

// FE CLIENT API BASIC
const clientBasic = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
});

// FE CLIENT API
const clientFe = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
});

// FE SERVER API
const clientBe = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/m2m`,
});

clientBe.interceptors.request.use(
    async (config) => {
        const accessToken = await getCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string, requestContext);
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    (error) => Promise.reject(error)
);

clientBe.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalConfig = err.config;

        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true; try {
                    const {
                        data: {
                            data: { access_token, expires_in },
                        },
                    } = await clientBasic.get<{ data: AuthEntity }>('/auth');

                    // so we can set cookie in each side
                    setCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string, access_token, typeof window === undefined ? undefined : requestContext);
                    originalConfig.headers.Authorization = `Bearer ${access_token}`;

                    return await clientBe(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    }
);

export { clientBasic, clientBe, clientFe, requestContext, setRequestContext };
