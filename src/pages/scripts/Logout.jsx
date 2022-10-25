import { useEffect } from 'react';
import { revokeToken } from '../../lib/helpers.js';

export default function Logout() {
    useEffect(() => {
        revokeToken();
    }, [])

    return (<></>)
}
