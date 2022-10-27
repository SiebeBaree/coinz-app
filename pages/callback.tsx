import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { getAccessToken, setTokenItems } from '../lib/storage';
import { discordCallback, discordRevokeToken } from '../lib/api';
import { Token } from '../lib/types';

export default function Callback() {
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        if (localStorage.getItem('oauth_state') !== decodeURIComponent(router.query.state as string)) {
            discordRevokeToken();
            document.location.replace('/');
        }

        if (!getAccessToken() || parseInt(sessionStorage.getItem('expires_in')) <= Math.floor(Date.now() / 1000)) {
            discordCallback(router.query.code as string).then((data: Token) => {
                if (!data.error) {
                    setTokenItems(data);
                    document.location.replace('/dashboard');
                } else {
                    document.location.replace('/login');
                }
            });
        } else {
            document.location.replace('/dashboard');
        }
    }, [router.isReady, router.query.code, router.query.state]);

    return (<></>)
}
