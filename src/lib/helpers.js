import { API_URI, API_ENDPOINT } from '../assets/data/config.json';

export function isLoggedIn() {
    let loggedIn = true;

    if (!sessionStorage.getItem('access_token') || parseInt(sessionStorage.getItem('expires_in')) <= parseInt(Date.now() / 1000)) loggedIn = false;
    if (!sessionStorage.getItem('user')) loggedIn = false;

    return loggedIn;
}

export function getAccessToken() {
    return sessionStorage.getItem('access_token');
}

export function getRefreshToken() {
    return localStorage.getItem('refresh_token');
}

export function getTokenType() {
    return sessionStorage.getItem('token_type') || 'Bearer';
}

export async function getUser(force = false) {
    async function fetchData(tokenType, token) {
        const res = await fetch(`${API_ENDPOINT}/users/@me`, {
            method: 'GET',
            headers: {
                'Authorization': `${tokenType} ${token}`
            }
        });
        return await res.json();
    }

    if (sessionStorage.getItem('user') && !force) {
        return JSON.parse(sessionStorage.getItem('user'));
    } else {
        const user = await fetchData(getTokenType(), getAccessToken());
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('user_id', user.id);
        sessionStorage.setItem('user_username', user.username);
        sessionStorage.setItem('user_discriminator', user.discriminator);
        sessionStorage.setItem('user_avatar', user.avatar);
        return user;
    }
}

export async function getGuilds(force = false) {
    async function fetchData(tokenType, token) {
        const res = await fetch(`${API_ENDPOINT}/users/@me/guilds`, {
            method: 'GET',
            headers: {
                'Authorization': `${tokenType} ${token}`
            }
        });
        return await res.json();
    }

    if (sessionStorage.getItem('guilds') && !force) {
        return JSON.parse(sessionStorage.getItem('guilds'));
    } else {
        const guilds = await fetchData(getTokenType(), getAccessToken());
        sessionStorage.setItem('guilds', JSON.stringify(guilds));
        return guilds;
    }
}

export function generateRandomString() {
    let randomString = '';
    const randomNumber = Math.floor(Math.random() * 10);

    for (let i = 0; i < 20 + randomNumber; i++) {
        randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
    }

    return randomString;
}

export function setTokenItems(data) {
    sessionStorage.setItem('access_token', data.access_token);
    sessionStorage.setItem('expires_in', parseInt(Date.now() / 1000) + data.expires_in);
    sessionStorage.setItem('token_type', data.token_type);
    localStorage.setItem('refresh_token', data.refresh_token);
}

export async function revokeToken(token = null, clearStorage = true, redirect = true) {
    if (token === null) token = getAccessToken();

    if (token) {
        await fetch(`${API_URI}/discord/revoke`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: token
            })
        });
    }

    if (clearStorage) {
        sessionStorage.clear();
        localStorage.clear();
    }

    if (redirect) window.location.replace('/');
}

export async function isAuthorized() {
    if (!isLoggedIn()) return false;

    async function fetchData(token) {
        const res = await fetch(`${API_URI}/discord/user/autorized/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res;
    }

    const id = sessionStorage.getItem('user_id');
    const token = getAccessToken();

    if (id && token) {
        fetchData(token).then((data) => {
            return data.status === 200;
        });
        return false;
    } else {
        return false;
    }
}