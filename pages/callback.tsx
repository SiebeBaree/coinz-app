import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { getAccessToken, setTokenItems, setUserItems } from '../lib/storage';
import { discordCallback, discordRevokeToken } from '../lib/api';
import { ApiCallbackResponds } from '../lib/types';

export default function Callback() {
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        if (localStorage.getItem('oauth_state') !== decodeURIComponent(router.query.state as string)) {
            discordRevokeToken();
            document.location.replace('/');
        }

        if (!getAccessToken() || parseInt(sessionStorage.getItem('expires_in')) <= Math.floor(Date.now() / 1000)) {
            discordCallback(router.query.code as string).then((data: ApiCallbackResponds) => {
                if (!data.error) {
                    setTokenItems({
                        access_token: data.access_token,
                        expires_in: data.expires_in,
                        refresh_token: data.refresh_token,
                        scope: data.scope,
                        token_type: data.token_type
                    });

                    setUserItems({
                        id: data.id,
                        username: data.username,
                        discriminator: data.discriminator,
                        avatar: data.avatar
                    });

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
