import { useEffect } from "react"
import Redirect from '../pages/components/Redirect.jsx'

function Discord() {
    useEffect(() => {
        window.location.replace("https://discord.gg/asnZQwc6kW")
    }, [])

    return (
        <Redirect />
    )
}

export default Discord