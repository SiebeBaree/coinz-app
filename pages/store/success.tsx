import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export async function getStaticProps() {
    return { props: {} };
}

export default function Success() {
    const router = useRouter();
    const [sessionId, setSessionId] = useState(undefined);

    useEffect(() => {
        if (!router.isReady) return;
        setSessionId(router.query.session_id);
    }, [router.isReady, router.query.session_id]);

    return (
        <div className="page-content container text-color d-flex flex-column justify-content-center align-items-center mt-5 gap-2">
            <h1>Successfully processed the payment!</h1>
            <h4>You will receive your products within 5 minutes.</h4>
            <p className="mt-3">If you haven&apos;t received any products within 15 minutes please contact us.</p>
            {sessionId && <p>Use this key <code>{sessionId}</code> to refer to your payment.</p>}
            <h5>Join our <Link href="/invite" target="_blank" className="text-danger">Discord server</Link> for support.</h5>
        </div>
    );
}