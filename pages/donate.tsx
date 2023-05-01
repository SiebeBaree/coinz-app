import styles from '../styles/Donate.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function DonatePage() {
    const [cryptoText, setCryptoText] = useState('Copy Address');
    const cryptoAddress = '0xC57a30A541DEd96384b4f6C0DA432E54E32C0790';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cryptoAddress)
            .then(() => setCryptoText(`Copied Address\n${cryptoAddress}`));

        setTimeout(() => {
            setCryptoText('Copy Address');
        }, 2000);
    };

    return (
        <div className="page-content">
            <div className="container">
                <div className="page-title">
                    <h1 className="watermark">Donate</h1>
                    <h1>Donate</h1>
                    <p>If you enjoy Coinz, please consider donating! We&apos;ve chosen to forgo premium subscriptions
                        and depend solely on donations moving forward.</p>
                </div>

                <div className="d-flex justify-content-around my-5 py-5 flex-wrap gap-3">
                    <Link
                        href="https://ko-fi.com/coinz"
                        target="_blank"
                        className={`${styles.donation} d-flex flex-column align-items-center justify-content-center p-3 gap-2 rounded-circle`}>
                        <Image src="/kofi.png" width={50} height={50} alt="Ko-Fi donation platform logo"/>
                        <h2>Ko-Fi</h2>
                    </Link>

                    <Link
                        href="https://www.paypal.com/donate/?hosted_button_id=3ANU36UKV87FE"
                        target="_blank"
                        className={`${styles.donation} d-flex flex-column align-items-center justify-content-center p-3 gap-2 rounded-circle`}>
                        <Image src="/paypal.png" width={50} height={50} alt="Ko-Fi donation platform logo"/>
                        <h2>PayPal</h2>
                    </Link>

                    <OverlayTrigger
                        placement="top"
                        trigger={['hover', 'focus']}
                        overlay={
                            <Tooltip>
                                {cryptoText}
                            </Tooltip>
                        }
                    >
                        <button
                            onClick={copyToClipboard}
                            className={`${styles.donation} d-flex flex-column align-items-center justify-content-center p-3 gap-2 rounded-circle disabled`}>
                            <Image src="/crypto.png" width={50} height={50} alt="Crypto donation platform logo"/>
                            <h2>Crypto</h2>
                        </button>
                    </OverlayTrigger>
                </div>
            </div>
        </div>
    );
}