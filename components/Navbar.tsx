import styles from '../styles/Navbar.module.css'
import Link from 'next/link'

const DISCORD_BASE_CDN = 'https://cdn.discordapp.com/';

export default function NavbarComponent() {
    const loggedIn = false;

    return (
        <div className='container'>
            <nav className={`navbar navbar-expand-lg ${styles.navbarHeader} ${styles.borderUnder}`}>
                <div className='container-fluid'>
                    <Link href="/"><a className={styles.navbarBrand}>Coinz</a></Link>

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
                                    <Link href="/faq"><a className={`nav-link ${styles.navbarLink}`} aria-current="page">FAQ</a></Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/commands"><a className={`nav-link ${styles.navbarLink}`}>Commands</a></Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/store"><a className={`nav-link ${styles.navbarLink}`}>Store</a></Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/invite"><a className={`nav-link ${styles.navbarLink}`}>Invite</a></Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto">
                                <li className='nav-item'>
                                    <Link href="/store"><a className={`nav-link ${styles.navbarLink}`}>Support</a></Link>
                                </li>
                                <li className='nav-item'>
                                    <Link href="/invite"><a className={`nav-link ${styles.navbarLink}`}>Login Via Discord</a></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}