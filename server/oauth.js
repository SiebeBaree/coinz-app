import { config } from "dotenv"
if (process.env.NODE_ENV !== 'production') {
    config();
}

const API_ENDPOINT = "https://discord.com/api/v10";
const REDIRECT_URI = process.env.WEBAPP_URL + "/callback";

export async function exchangeCode(code) {
    const res = await fetch(`${API_ENDPOINT}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        })
    });
    return await res.json();
}

export async function refreshToken(refreshToken) {
    const res = await fetch(`${API_ENDPOINT}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    });
    return await res.json();
}

export async function getToken() {
    const res = await fetch(`${API_ENDPOINT}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'scope': 'identify connections'
        }),
    });
    return await res.json();
}

export async function revokeToken(token) {
    const res = await fetch(`${API_ENDPOINT}/oauth2/token/revoke`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            token: token
        })
    });
    return await res.json();
}

export async function getUser(token) {
    const res = await fetch(`${API_ENDPOINT}/users/@me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await res.json();
}

export async function getGuilds(token) {
    const res = await fetch(`${API_ENDPOINT}/users/@me/guilds`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await res.json();
}