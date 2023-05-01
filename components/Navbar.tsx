import styles from '../styles/Navbar.module.css';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function NavbarComponent() {
    const router = useRouter();
    const isCurrentPage = (pagePath: string) => router.pathname === pagePath;

    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
    });

    return (
        <div className="container">
            <nav className={`navbar navbar-expand-lg ${styles.navbarHeader} ${styles.borderUnder}`}>
                <div className="container-fluid">
                    <Link href="/" className={`${styles.navbarBrand} me-4`}>Coinz</Link>

                    <button className={`${styles.navbarToggler} navbar-toggler`} type="button"
                            data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`${styles.offCanvas} offcanvas offcanvas-end`} id="offcanvasNavbar"
                         aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title mx-auto" id="offcanvasNavbarLabel">Coinz</h5>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav">
                                <li className={`nav-item ${styles.navItem} ${isCurrentPage('/faq') ? styles.activeNav : ''}`}>
                                    <Link href="/faq" className={`nav-link ${styles.navbarLink}`}>FAQ</Link>
                                </li>
                                <li className={`nav-item ${styles.navItem} ${isCurrentPage('/commands') ? styles.activeNav : ''}`}>
                                    <Link href="/commands" className={`nav-link ${styles.navbarLink}`}>Commands</Link>
                                </li>
                                <li className={`nav-item ${styles.navItem} ${isCurrentPage('/items') ? styles.activeNav : ''}`}>
                                    <Link href="/items" className={`nav-link ${styles.navbarLink}`}>Items</Link>
                                </li>
                                <li className={`nav-item ${styles.navItem} ${isCurrentPage('/status') ? styles.activeNav : ''}`}>
                                    <Link href="/status" className={`nav-link ${styles.navbarLink}`}>Status</Link>
                                </li>
                                <li className={`nav-item ${styles.navItem} ${isCurrentPage('/updates') ? styles.activeNav : ''}`}>
                                    <Link href="/updates" className={`nav-link ${styles.navbarLink}`}>Updates</Link>
                                </li>
                                <li className={`nav-item ${styles.navItem}`}>
                                    <Link
                                        href="https://discord.com/oauth2/authorize?client_id=938771676433362955&permissions=313344&scope=bot%20applications.commands"
                                        className={`nav-link ${styles.navbarLink}`} target="_blank">Invite</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto">
                                <li className={`nav-item ${styles.navItem} ${styles.navItemButton} fw-bold`}>
                                    <Link href="/donate"
                                          className={`nav-link ${styles.navbarLink} ${styles.colored} px-3`}>
                                        Donate
                                    </Link>
                                </li>
                                <li className={`nav-item ${styles.navItem} ${styles.navItemButton} fw-bold`}>
                                    <Link href="https://discord.gg/asnZQwc6kW"
                                          className={`nav-link ${styles.navbarLink} ${styles.colored} px-3`}
                                          target="_blank">
                                        Support Server
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}