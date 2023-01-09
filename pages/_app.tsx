import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

import Head from 'next/head';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Coinz</title>
            </Head>

            <Navbar />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
