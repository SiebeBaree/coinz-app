import { useEffect } from 'react';
import { API_URI } from '../assets/data/config.json';
import { getAccessToken, getRefreshToken } from './helpers';

const DISCORD_CLIENT_ID = "938771676433362955";
const API_ENDPOINT = "https://discord.com/api/v10";
const REDIRECT_URI = "http://localhost:5173/callback";
const SCOPE = ['identify', 'guilds'];
const LOGIN_URI = `${API_ENDPOINT}/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE.join('%20')}&prompt=consent`;

export default function Login() {
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

        const refreshToken = getRefreshToken();
        if (getAccessToken() && parseInt(sessionStorage.getItem('expires_in')) > parseInt(Date.now() / 1000)) {
            document.location.replace('/dashboard');
        } else if (refreshToken) {
            fetchData(refreshToken).then((data) => {
                if (!data.error) {
                    sessionStorage.setItem('access_token', data.access_token);
                    sessionStorage.setItem('expires_in', parseInt(Date.now() / 1000) + data.expires_in);
                    localStorage.setItem('refresh_token', data.refresh_token);
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
