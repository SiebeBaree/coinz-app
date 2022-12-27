import styles from '../styles/navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function NavbarComponent() {
    const [loggedIn, setLogin] = useState(false);

    function hasUserData() {
        return sessionStorage.getItem('user') ? true : false;
    }

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        setLogin(hasUserData());
    }, [])

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
                                <li className={`nav-item ${styles.navItem}`}>
                                    <Link href="/faq" className={`nav-link ${styles.navbarLink}`}>FAQ</Link>
                                </li>
                                <li className={`nav-item ${styles.navItem}`}>
                                    <Link href="/commands" className={`nav-link ${styles.navbarLink}`}>Commands</Link>
                                </li>
                                <li className={`nav-item ${styles.navItem}`}>
                                    <Link href="/store" className={`nav-link ${styles.navbarLink}`}>Store</Link>
                                </li>
                                <li className={`nav-item ${styles.navItem}`}>
                                    <Link href="/invite" className={`nav-link ${styles.navbarLink}`} target="_blank">Invite</Link>
                                </li>
                                <li className={`nav-item ${styles.navItem}`}>
                                    <Link href="/status" className={`nav-link ${styles.navbarLink}`}>Status</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto">
                                <li className={`nav-item ${styles.navItem}`}>
                                    <Link href="/discord" className={`nav-link ${styles.navbarLink}`} target="_blank">Support</Link>
                                </li>
                                {loggedIn ? (
                                    <li className={`nav-item dropdown ${styles.navItem}`}>
                                        <a className={`nav-link dropdown-toggle d-flex align-items-center ${styles.navbarLink}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className='d-flex align-items-center'>
                                                <Image src={`https://cdn.discordapp.com/avatars/${sessionStorage.getItem('user_id')}/${sessionStorage.getItem('user_avatar')}.png?size=32`} className="rounded-circle" height="32" width="32" alt="Discord Profile Picture" loading="lazy" />
                                                {sessionStorage.getItem('user_username')}#{sessionStorage.getItem('user_discriminator')}
                                            </span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" href={`/dashboard/${sessionStorage.getItem('user_id')}`}>Dashboard</Link></li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li><Link className="dropdown-item text-danger" href="/logout">Logout</Link></li>
                                        </ul>
                                    </li>
                                ) : (
                                    <li className='nav-item'>
                                        <Link href="/login" className={`nav-link ${styles.navbarLink}`}>Login Via Discord</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}