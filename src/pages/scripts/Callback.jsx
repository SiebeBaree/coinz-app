import { useEffect } from 'react';
import { API_URI } from '../../assets/data/config.json';
import { getAccessToken, revokeToken, setTokenItems } from '../../lib/helpers.js';

export default function Callback() {
    useEffect(() => {
        async function fetchData() {
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });

            if (localStorage.getItem('oauth-state') !== window.atob(decodeURIComponent(params.state))) {
                console.log("State doesn't match. You may have been clickjacked!\nFor more information please visit: https://auth0.com/docs/protocols/state-parameters");
                revokeToken();
            }

            const res = await fetch(`${API_URI}/discord/callback`, {
                method: 'POST',
                body: JSON.stringify({
                    code: params.code,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await res.json();
        }

        if (!getAccessToken() || parseInt(sessionStorage.getItem('expires_in')) <= parseInt(Date.now() / 1000)) {
            fetchData().then((data) => {
                console.log(data)
                if (!data.error) {
                    setTokenItems(data);
                    document.location.replace('/dashboard');
                } else {
                    document.location.replace('/login')
                }
            });
        } else {
            document.location.replace('/dashboard');
        }
    }, [])

    return (<></>)
}
