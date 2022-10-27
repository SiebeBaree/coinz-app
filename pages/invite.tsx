import { useEffect } from "react"
import { useRouter } from 'next/router'
import Redirect from '../components/Redirect'

export default function Invite() {
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
        window.location.replace(`https://discord.com/api/oauth2/authorize?client_id=938771676433362955&permissions=313344&scope=bot%20applications.commands${router.query.id === undefined ? "" : `&guild_id=${router.query.id}`}`)
    }, [router.isReady]);

    return (
        <Redirect />
    )
}