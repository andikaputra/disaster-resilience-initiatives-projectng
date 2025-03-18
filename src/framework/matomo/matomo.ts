import { init, push } from '@socialgouv/matomo-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const onRouteChange = () => {
    push(['setDocumentTitle', document.title]);
};

const loadMatomo = () => {
    function generateUniqueId(length: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = '';
        for (let i = 0; i < length; i += 1) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    init({
        url: process.env.NEXT_PUBLIC_MATOMO_URL as string,
        siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID as string,
        phpTrackerFile: process.env.NEXT_PUBLIC_MATOMO_PHP_TRACKER as string,
        onRouteChangeComplete: onRouteChange,
    });
    let userId = localStorage.getItem('user_id');
    if (!userId) {
        userId = generateUniqueId(15);
        localStorage.setItem('user_id', userId);
    }
    push(['setUserId', userId]);
    push(['trackPageView']);
    push(['enableLinkTracking']);
};
export default function useEffectMatomo() {
    const router = useRouter();
    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        loadMatomo();
        router.events.on('routeChangeComplete', onRouteChange);
        return () => {
            router.events.off('routeChangeComplete', onRouteChange);
        };
    }, []);
}
