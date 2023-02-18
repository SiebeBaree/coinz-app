import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description"
                    content="Coinz is the only discord economy bot you will ever need. It has 45+ commands to keep you entertained." />
                <meta name="keywords"
                    content="Discord, Discord Bot, Bot, Economy, Discord Economy Bot, Blackjack, Poker, Stocks, Crypto" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="author" content="Coinz" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://coinzbot.xyz/" />
                <link rel="apple-touch-icon" href="/logo192.png" />
                <link rel="icon" href="/favicon.ico" />

                <meta property="og:image" content="/logo512.png" />
                <meta property="og:description"
                    content="Coinz is the only discord economy bot you will ever need. It has 45+ commands to keep you entertained." />
                <meta property="og:title" content="Coinz" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://coinzbot.xyz/" />
                <meta property="og:locale" content="en_US" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:creator" content="@BareeSiebe" />
                <meta name="twitter:title" content="Coinz" />
                <meta name="twitter:description"
                    content="Coinz is the only discord economy bot you will ever need. It has 45+ commands to keep you entertained." />
                <meta name="twitter:image" content="/logo512.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
