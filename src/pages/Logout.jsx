import { useEffect } from 'react';
import { revokeToken } from './helpers';

export default function Logout() {
    useEffect(() => {
        revokeToken();
    }, [])

    return (<></>)
}
