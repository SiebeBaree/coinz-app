import { useEffect } from 'react';
import { discordRevokeToken } from '../lib/api';

export default function Logout() {
    useEffect(() => {
        discordRevokeToken();
    }, [])

    return (<></>)
}
