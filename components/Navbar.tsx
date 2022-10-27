import styles from '../styles/navbar.module.css'
import Link from 'next/link'

const DISCORD_BASE_CDN = 'https://cdn.discordapp.com/';

export default function NavbarComponent() {
    const loggedIn = false;

    return (
        <div className='container'>
            <nav className={`navbar navbar-expand-lg ${styles.navbarHeader} ${styles.borderUnder}`}>
                <div className='container-fluid'>
                    <Link href="/" className={styles.navbarBrand}>Coinz</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Coinz</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link href="/faq" className={`nav-link ${styles.navbarLink}`}>FAQ</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/commands" className={`nav-link ${styles.navbarLink}`}>Commands</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/store" className={`nav-link ${styles.navbarLink}`}>Store</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/invite" className={`nav-link ${styles.navbarLink}`} target="_blank">Invite</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto">
                                <li className='nav-item'>
                                    <Link href="/discord" className={`nav-link ${styles.navbarLink}`} target="_blank">Support</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link href="/login" className={`nav-link ${styles.navbarLink}`}>Login Via Discord</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}