import { useEffect } from 'react';
import { getAccessToken, getUser } from './helpers';

export default function Dashboard() {
    useEffect(() => {
        if (!getAccessToken()) {
            sessionStorage.clear();
            document.location.replace('/login');
        } else {
            if (!sessionStorage.getItem('user')) {
                getUser().then(() => window.location.reload());
            }
        }
    })

    return (<></>)
}
