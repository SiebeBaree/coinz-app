import config from './data/config.json'
const { API_URI, API_ENDPOINT } = config;

import {
    getAccessToken,
    getTokenType,
    getUser as getUserFromStorage,
    setUserItems
} from './storage';

export async function discordCallback(token: string) {
    const res = await fetch(`${API_URI}/discord/callback`, {
        method: 'POST',
        body: JSON.stringify({
            token: token,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

export async function discordRefreshToken(token: string) {
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

export async function discordRevokeToken(token = null, clearStorage = true, redirect = true) {
    if (token === null) token = getAccessToken();

    if (token) {
        await fetch(`${API_URI}/discord/revoke`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            })
        });
    }

    if (clearStorage) {
        sessionStorage.clear();
        localStorage.clear();
    }

    if (redirect) window.location.replace('/');
}

export async function getUser(force = false) {
    async function fetchUser(tokenType: string, token: string) {
        const res = await fetch(`${API_ENDPOINT}/users/@me`, {
            method: 'GET',
            headers: {
                'Authorization': `${tokenType} ${token}`
            }
        });
        return await res.json();
    }

    if (sessionStorage.getItem('user') && !force) {
        return getUserFromStorage();
    } else {
        const user = await fetchUser(getTokenType(), getAccessToken());
        setUserItems(user);
        return user;
    }
}

export async function isAuthorized() {
    async function fetchData(id: string, token: string) {
        const res = await fetch(`${API_URI}/discord/authorize?id=${id}&token=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.status;
    }

    const res = await fetchData(sessionStorage.getItem('user_id'), getAccessToken());

    if (res !== 200) await discordRevokeToken(undefined, true, true);
    return res === 200;
}