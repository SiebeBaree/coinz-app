import Image from 'next/image';
import styles from '../styles/Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className={`${styles.footer}`}>
            <div className="container d-flex align-items-center justify-content-between h-100 gap-5">
                <div className="d-flex gap-4">
                    <Image src="/logo192.png" alt="The logo of Coinz" width={75} height={75} className="my-auto"/>
                    <div className="d-flex flex-column justify-content-center my-auto">
                        <h1>Coinz</h1>
                        <p className="m-0">Copyright © 2023 Coinz</p>
                    </div>
                </div>

                <div className="d-flex gap-4 flex-wrap">
                    <Link href="/commands" className={styles.notImportant}>Commands</Link>
                    <Link href="/donate" className={styles.notImportant}>Donate</Link>
                    <a href="https://discord.gg/asnZQwc6kW" target="_blank" rel="noreferrer"
                       className={styles.notImportant}>Support Server</a>
                    <Link href="/terms-of-use">Terms Of Use</Link>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
}