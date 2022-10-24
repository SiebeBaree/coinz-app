import { API_URI } from '../assets/data/config.json';
const API_ENDPOINT = "https://discord.com/api/v10";

export function isLoggedIn() {
    let loggedIn = true;

    if (!sessionStorage.getItem('access_token')) loggedIn = false;
    if (!sessionStorage.getItem('user')) loggedIn = false;

    return loggedIn;
}

export function getAccessToken() {
    return sessionStorage.getItem('access_token');
}

export function getRefreshToken() {
    return localStorage.getItem('refresh_token');
}

export async function getUser(force = false) {
    async function fetchData(token) {
        const res = await fetch(`${API_ENDPOINT}/users/@me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await res.json();
    }

    if (sessionStorage.getItem('user') && !force) {
        return JSON.parse(sessionStorage.getItem('user'));
    } else {
        const user = await fetchData(getAccessToken());
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('user_id', user.id);
        sessionStorage.setItem('user_username', user.username);
        sessionStorage.setItem('user_discriminator', user.discriminator);
        sessionStorage.setItem('user_avatar', user.avatar);
        return user;
    }
}

export async function getGuilds(force = false) {
    async function fetchData(token) {
        const res = await fetch(`${API_ENDPOINT}/users/@me/guilds`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await res.json();
    }

    if (sessionStorage.getItem('guilds') && !force) {
        return JSON.parse(sessionStorage.getItem('guilds'));
    } else {
        const guilds = await fetchData(getAccessToken());
        sessionStorage.setItem('guilds', JSON.stringify(guilds));
        return guilds;
    }
}