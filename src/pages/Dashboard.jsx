import { useEffect } from 'react';
import { API_URI } from '../assets/data/config.json';

export default function Dashboard() {
    useEffect(() => {
        async function fetchData(token) {
            const res = await fetch(`${API_URI}/discord/user?code=${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await res.json();
        }

        if (!sessionStorage.getItem('access_token')) {
            sessionStorage.clear();
            localStorage.clear();
            document.location.replace('/login');
        } else {
            if (!sessionStorage.getItem('user')) {
                fetchData(sessionStorage.getItem('access_token')).then((data) => {
                    sessionStorage.setItem('user', JSON.stringify(data));
                    sessionStorage.setItem('user_id', data.id);
                    sessionStorage.setItem('user_username', data.username);
                    sessionStorage.setItem('user_discriminator', data.discriminator);
                    sessionStorage.setItem('user_avatar', data.avatar);
                    window.location.reload();
                });
            }
        }
    })

    return (<></>)
}
