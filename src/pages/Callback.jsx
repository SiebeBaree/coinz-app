import { useEffect } from 'react';
import { API_URI } from '../assets/data/config.json';

export default function Callback() {
    useEffect(() => {
        async function fetchData() {
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });

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

        if (!sessionStorage.getItem('access_token')) {
            fetchData().then((data) => {
                if (!data.error) {
                    sessionStorage.setItem('access_token', data.access_token);
                    sessionStorage.setItem('expires_in', data.expires_in);
                    localStorage.setItem('refresh_token', data.refresh_token);
                    document.location.replace('/dashboard');
                }
            });
        } else {
            document.location.replace('/dashboard');
        }
    }, [])

    return (<></>)
}
