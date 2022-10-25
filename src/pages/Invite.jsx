import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Redirect from '../pages/components/Redirect.jsx'

function Discord() {
    const { id } = useParams();

    useEffect(() => {
        window.location.replace(`https://discord.com/api/oauth2/authorize?client_id=938771676433362955&permissions=313344&scope=bot%20applications.commands${id === undefined ? "" : `&guild_id=${id}`}`)
    }, [])

    return (
        <Redirect />
    )
}

export default Discord