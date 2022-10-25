import { useEffect } from "react"
import Redirect from '../components/Redirect.jsx'

function Discord() {
    useEffect(() => {
        window.location.replace("https://discord.gg/asnZQwc6kW")
    }, [])

    return (
        <Redirect />
    )
}

export default Discord