import axios from 'axios';
import { config } from "dotenv"
if (process.env.NODE_ENV !== 'production') {
    config();
}

const API_ENDPOINT = "https://discord.com/api/v10";
const REDIRECT_URI = process.env.WEBAPP_URL + "/callback";

export async function exchangeCode(code) {
    const res = await axios.post(`${API_ENDPOINT}/oauth2/token`, new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
    }));
    return res.data;
}

export async function refreshToken(refreshToken) {
    const res = await axios.post(`${API_ENDPOINT}/oauth2/token`, new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken
    }));
    return res.data;
}

export async function getToken() {
    const res = await axios.post(`${API_ENDPOINT}/oauth2/token`, new URLSearchParams({
        'grant_type': 'client_credentials',
        'scope': 'identify connections'
    }));
    return res.data;
}

export async function revokeToken(token) {
    const res = await axios.post(`${API_ENDPOINT}/oauth2/token/revoke`, new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        token: token
    }));
    return { status: res.status };
}

export async function getUser(token) {
    const res = await axios.get(`${API_ENDPOINT}/users/@me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}
