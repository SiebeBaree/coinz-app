import { useEffect } from 'react';

const DISCORD_CLIENT_ID = "938771676433362955";
const API_ENDPOINT = "https://discord.com/api/v10";
const REDIRECT_URI = "http://localhost:5173/callback";
const SCOPE = ['identify', 'guilds'];
const LOGIN_URI = `${API_ENDPOINT}/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE.join('%20')}&prompt=consent`;

export default function Login() {
    useEffect(() => {
        if (sessionStorage.getItem('access_token')) {
            document.location.replace('/dashboard');
        } else {
            document.location.replace(LOGIN_URI);
        }
    }, [])

    return (<></>)
}
