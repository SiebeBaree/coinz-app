import { useEffect } from 'react'
import { API_ENDPOINT, DISCORD_CLIENT_ID, SCOPE } from '../lib/data/config.json'
import { discordRefreshToken } from '../lib/api'
import { getRefreshToken, getAccessToken, setTokenItems } from '../lib/storage'
import { Token } from '../lib/types'

const generateRandomString = (length = 0) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    length = length === 0 ? Math.floor(Math.random() * (48 - 24 + 1) + 24) : length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

const setOauthState = () => {
    const state = generateRandomString();
    localStorage.setItem('oauth_state', state);
    return `${API_ENDPOINT}/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${window.location.origin + "/callback"}` +
        `&response_type=code&scope=${SCOPE.join('%20')}&prompt=consent&state=${encodeURIComponent(state)}`;
}

export default function Login() {
    useEffect(() => {
        const refreshToken = getRefreshToken();
        if (getAccessToken() && parseInt(sessionStorage.getItem('expires_in')) > Math.floor(Date.now() / 1000)) {
            document.location.replace('/dashboard');
        } else if (refreshToken) {
            discordRefreshToken(refreshToken).then((data: Token) => {
                if (!data.error) {
                    setTokenItems(data);
                    document.location.replace('/dashboard');
                } else {
                    document.location.replace(setOauthState());
                }
            });
        } else {
            document.location.replace(setOauthState());
        }
    })

    return (<></>)
}
