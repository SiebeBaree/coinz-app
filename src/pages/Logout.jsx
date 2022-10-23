import { useEffect } from 'react';
import { API_URI } from '../assets/data/config.json';

export default function Logout() {
    useEffect(() => {
        async function fetchData(token) {
            const res = await fetch(`${API_URI}/discord/revoke?code=${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await res.json();
        }

        if (sessionStorage.getItem('access_token')) {
            fetchData(sessionStorage.getItem('access_token')).then(() => {
                sessionStorage.clear();
                localStorage.clear();
                document.location.replace('/');
            });
        } else {
            sessionStorage.clear();
            localStorage.clear();
            document.location.replace('/');
        }
    }, [])

    return (<></>)
}
