import styles from '../styles/navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function NavbarComponent() {
    const [loggedIn, setLogin] = useState(false);
    const [user, setUser] = useState({
        id: '',
        username: '',
        discriminator: '',
        avatar: '',
    });

    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');

        const userObj = {
            id: sessionStorage.getItem('user_id') ?? '',
            username: sessionStorage.getItem('user_username') ?? '',
            discriminator: sessionStorage.getItem('user_discriminator') ?? '',
            avatar: sessionStorage.getItem('user_avatar') ?? '',
        };
        setUser(userObj);
        setLogin(user.id !== '' && user.username !== '' && user.discriminator !== '');

        addEventListener('storage', (e) => {
            if (e.storageArea === sessionStorage) {
                setUser({
                    id: sessionStorage.getItem('user_id') ?? '',
                    username: sessionStorage.getItem('user_username') ?? '',
                    discriminator: sessionStorage.getItem('user_discriminator') ?? '',
                    avatar: sessionStorage.getItem('user_avatar') ?? '',
                });

                setLogin(user.id !== '' && user.username !== '' && user.discriminator !== '');
            }
        });
    }, [user.id, user.username, user.discriminator, user.avatar]);

    return (
        <div className='container'>
            <nav className={`navbar navbar-expand-lg ${styles.navbarHeader} ${styles.borderUnder}`}>
                <div className='container-fluid'>
                    <Link href="/" className={styles.navbarBrand}>Coinz</Link>

                    <button className={`${styles.navbarToggler} navbar-toggler`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`${styles.offCanvas} offcanvas offcanvas-end`} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title mx-auto" id="offcanvasNavbarLabel">Coinz</h5>
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
                                    <Link href="/status" className={`nav-link ${styles.navbarLink}`}>Status</Link>
                                </li>
                                <li className={`nav-item ${styles.navItem}`}>
                                    <Link href="/updates" className={`nav-link ${styles.navbarLink}`}>Updates</Link>
                                </li>
                                <li className={`nav-item ${styles.navItem}`}>
                                    <Link href="https://discord.com/api/oauth2/authorize?client_id=938771676433362955&permissions=313344&scope=bot%20applications.commands" className={`nav-link ${styles.navbarLink}`} target="_blank" rel="noreferrer">Invite</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto">
                                <li className={`nav-item ${styles.navItem}`}>
                                    <Link href="https://discord.gg/asnZQwc6kW" className={`nav-link ${styles.navbarLink}`} target="_blank">Support</Link>
                                </li>
                                {loggedIn ? (
                                    <li className={`nav-item dropdown ${styles.navItem}`}>
                                        <a className={`nav-link dropdown-toggle d-flex align-items-center ${styles.navbarLink}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className='d-flex align-items-center'>
                                                {
                                                    user.avatar === '' ?
                                                        <Image src={'https://cdn.discordapp.com/embed/avatars/1.png?size=32'} className="rounded-circle me-2" height="32" width="32" alt="Discord Profile Picture" loading="lazy" /> :
                                                        <Image src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=32`} className="rounded-circle me-2" height="32" width="32" alt="Discord Profile Picture" loading="lazy" />
                                                }

                                                {user.username}#{user.discriminator}
                                            </span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" href={'/dashboard'}>Dashboard</Link></li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li><Link className="dropdown-item text-danger" href="/logout">Logout</Link></li>
                                        </ul>
                                    </li>
                                ) : (
                                    <li className='nav-item'>
                                        <Link href="/dashboard" className={`nav-link ${styles.navbarLink}`}>Login Via Discord</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}