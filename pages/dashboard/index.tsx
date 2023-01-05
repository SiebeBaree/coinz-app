import { useEffect } from 'react';
import { getAccessToken } from '../../lib/storage';
import { getUser } from '../../lib/api';
import { User } from '../../lib/types';

export default function Dashboard() {
    useEffect(() => {
        if (!getAccessToken()) {
            sessionStorage.clear();
            document.location.replace('/login');
        } else {
            getUser().then((user: User) => {
                window.location.replace('/dashboard/' + user.id);
            });
        }
    });

    return (<></>);
}