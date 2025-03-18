import { AxiosError } from 'axios';
import { DefaultException } from '../../exception/DefaultException';

export default async function getServerSidePropsWrapper<T>(
    handler: () => T,
    onSuccess?: () => void,
    onError?: () => void,
    onFinally?: () => void
) {
    try {
        const data = await handler?.();
        onSuccess?.();
        return data;
    } catch (error) {
        onError?.();
        if (error instanceof DefaultException) {
            throw error;
        }
        if (error instanceof AxiosError) {
            throw new DefaultException(error.response?.data?.meta?.error ?? '500 : Terjadi gangguan pada server', {
                code: error?.code ?? '500',
                subTitle: error?.response?.data?.meta?.error ?? 'Terjadi gangguan',
                title: error?.response?.data?.meta?.message ?? '500 : Terjadi gangguan pada server',
            });
        }
        throw new DefaultException();
    } finally {
        onFinally?.();
    }
}
