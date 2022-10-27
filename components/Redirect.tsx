import RedirectImg from "../public/redirect.webp"
import Image from "next/image"

function Redirect() {
    return (
        <div className="d-flex flex-column text-white align-items-center justify-content-center" style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }}>
            <Image src={RedirectImg} alt="Redirect image icon" height="256" width="256" />
            <h1 style={{
                marginTop: "25px",
                fontSize: "4rem"
            }}>Hang Tight!</h1>
            <h3>You&apos;re being redirected...</h3>
        </div>
    )
}

export default Redirect