import { Token, User } from './types';

export function getAccessToken() {
    return sessionStorage.getItem('access_token');
}

export function getRefreshToken() {
    return localStorage.getItem('refresh_token');
}

export function getTokenType() {
    return sessionStorage.getItem('token_type') || 'Bearer';
}

export function getUser() {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function setTokenItems(data: Token) {
    sessionStorage.setItem('access_token', data.access_token);
    sessionStorage.setItem('expires_in', (Math.floor(Date.now() / 1000) + data.expires_in).toString());
    sessionStorage.setItem('token_type', data.token_type);
    localStorage.setItem('refresh_token', data.refresh_token);
}

export function setUserItems(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('user_id', user.id);
    sessionStorage.setItem('user_username', user.username);
    sessionStorage.setItem('user_discriminator', user.discriminator);
    sessionStorage.setItem('user_avatar', user.avatar);
}