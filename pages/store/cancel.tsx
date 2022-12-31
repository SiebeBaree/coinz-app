import Link from "next/link"

export async function getStaticProps() {
    return { props: {} }
}

export default function Cancel() {
    return (
        <div className="container text-color">
            <div className="d-flex flex-column justify-content-center align-items-center mt-5 gap-2">
                <h1>Payment Cancelled</h1>
                <h4>Did you cancel the payment or did something go wrong?</h4>
                <h4>Join our <Link href="/invite" target="_blank" className="text-danger">Discord server</Link> for support.</h4>
            </div>
        </div>
    )
}