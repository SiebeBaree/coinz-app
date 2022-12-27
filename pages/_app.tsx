import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

import Head from 'next/head'

import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description"
          content="Coinz is the only discord economy bot you will ever need. It has 45+ commands to keep you entertained." />
        <meta name="keywords"
          content="Discord, Discord Bot, Bot, Economy, Discord Economy Bot, Blackjack, Poker, Stocks, Crypto" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="author" content="Siebe Baree" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://coinzbot.xyz/" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="icon" href="/favicon.ico" />
        <title>Coinz</title>

        <meta property="og:image" content="/logo512.png" />
        <meta property="og:description"
          content="Coinz is the only discord economy bot you will ever need. It has 45+ commands to keep you entertained." />
        <meta property="og:title" content="SiebeBaree" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://coinzbot.xyz/" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@BareeSiebe" />
        <meta name="twitter:creator" content="@BareeSiebe" />
        <meta name="twitter:title" content="Coinz" />
        <meta name="twitter:description"
          content="Coinz is the only discord economy bot you will ever need. It has 45+ commands to keep you entertained." />
        <meta name="twitter:image" content="/logo512.png" />
      </Head>

      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
