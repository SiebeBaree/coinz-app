import { useEffect } from 'react';
import { API_URI, API_ENDPOINT, DISCORD_CLIENT_ID, SCOPE } from '../../assets/data/config.json';
import { generateRandomString, getAccessToken, getRefreshToken, setTokenItems } from '../../lib/helpers.js';

export default function Login() {
    const randomString = generateRandomString();

    useEffect(() => {
        async function fetchData(token) {
            const res = await fetch(`${API_URI}/discord/refresh`, {
                method: 'POST',
                body: new URLSearchParams({
                    token: token,
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return await res.json();
        }

        localStorage.setItem('oauth-state', randomString);
        const LOGIN_URI = `${API_ENDPOINT}/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${window.location.origin + "/callback"}` +
            `&response_type=code&scope=${SCOPE.join('%20')}&prompt=consent&state=${encodeURIComponent(window.btoa(randomString))}`;

        const refreshToken = getRefreshToken();
        if (getAccessToken() && parseInt(sessionStorage.getItem('expires_in')) > parseInt(Date.now() / 1000)) {
            document.location.replace('/dashboard');
        } else if (refreshToken) {
            fetchData(refreshToken).then((data) => {
                if (!data.error) {
                    setTokenItems(data);
                    document.location.replace('/dashboard');
                } else {
                    document.location.replace(LOGIN_URI);
                }
            });
        } else {
            document.location.replace(LOGIN_URI);
        }
    }, [])

    return (<></>)
}
