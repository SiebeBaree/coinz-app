import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAccessToken, setTokenItems, setUserItems } from '../lib/storage';
import { discordCallback, discordRevokeToken } from '../lib/api';
import { ApiCallbackResponds } from '../lib/types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

export default function Callback() {
    const router = useRouter();
    const [error, setError] = useState(false);

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
                        token_type: data.token_type,
                    });

                    setUserItems({
                        id: data.id,
                        username: data.username,
                        discriminator: data.discriminator,
                        avatar: data.avatar,
                    });

                    document.location.replace('/dashboard');
                } else {
                    document.location.replace('/login');
                }
            }).catch((e) => {
                console.log(e);
                setError(true);
            });
        } else {
            document.location.replace('/dashboard');
        }
    }, [router.isReady, router.query.code, router.query.state]);

    return (
        <>
            {error &&
                <div className='page-content my-auto d-flex flex-column justify-content-center text-center'>
                    <FontAwesomeIcon icon={faBan} className='text-danger' style={{
                        height: '150px',
                        marginBottom: '50px',
                    }} />
                    <h1 className='text-danger display-5'>Something went wrong, please try again.</h1>
                    <p className='text-white display-6'>If the issue keeps occuring, please contact <code className='text-info'>Siebe#0001</code> on Discord.</p>
                </div>
            }
        </>
    );
}
