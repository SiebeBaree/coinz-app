import RedirectImg from "../../assets/img/redirect.webp"

function Redirect() {
    return (
        <div className="d-flex flex-column text-white align-items-center justify-content-center" style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }}>
            <img src={RedirectImg} alt="Redirect 302 image icon" height="256px" />
            <h1 style={{
                marginTop: "25px",
                fontSize: "4rem"
            }}>Hang Tight!</h1>
            <h3>You&apos;re being redirected...</h3>
        </div>
    )
}

export default Redirect