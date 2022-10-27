import { useEffect } from "react"
import { useRouter } from 'next/router'
import Redirect from '../components/Redirect'

export default function Invite() {
    const { query } = useRouter();

    useEffect(() => {
        window.location.replace(`https://discord.com/api/oauth2/authorize?client_id=938771676433362955&permissions=313344&scope=bot%20applications.commands${query.id === undefined ? "" : `&guild_id=${id}`}`)
    })

    return (
        <Redirect />
    )
}