import '../style/Navbar.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { isLoggedIn } from '../helpers.js';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const DISCORD_BASE_CDN = 'https://cdn.discordapp.com/';

function NavbarComponent() {
    const [loggedIn, setLogin] = useState(false);

    useEffect(() => {
        setLogin(isLoggedIn());
    })

    return (
        <Container fluid="lg">
            <Navbar expand="lg" className='border-under'>
                <Container fluid="fluid">
                    <Navbar.Brand as={Link} to="/">Coinz</Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar-expand-lg"
                        aria-labelledby="offcanvasNavbarLabel-expand-lg"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                                Coinz
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav>
                                <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
                                <Nav.Link as={Link} to="/commands">Commands</Nav.Link>
                                <Nav.Link as={Link} to="/store">Store</Nav.Link>
                                <Nav.Link as={Link} to="/invite" target="_blank">Invite</Nav.Link>
                            </Nav>
                            <Nav className="ms-auto">
                                <Nav.Link as={Link} to="/discord" target="_blank">Support</Nav.Link>
                                {loggedIn ? (
                                    <NavDropdown id="offcanvasNavbarDropdown-expand-lg" className="nav-btn" title={
                                        <span>
                                            <img src={`https://cdn.discordapp.com/avatars/${sessionStorage.getItem('user_id')}/${sessionStorage.getItem('user_avatar')}.png?size=32`} className="rounded-circle" height="32" alt="Discord Profile Picture" loading="lazy" />
                                            {sessionStorage.getItem('user_username')}#{sessionStorage.getItem('user_discriminator')}
                                        </span>
                                    }>
                                        <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/ban-appeal">Ban Appeal</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/report">Report User</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/logout" className="text-danger">Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ) : <Nav.Link as={Link} to="/login">Login Via Discord</Nav.Link>}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </Container>
    )
}

export default NavbarComponent