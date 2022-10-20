import '../style/Navbar.css'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavbarComponent() {
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
                                <NavDropdown id="offcanvasNavbarDropdown-expand-lg" className="nav-btn" title={
                                    <span>
                                        <img src="https://cdn.discordapp.com/avatars/643072638075273248/32edb848e9f83f67be8dcdb86912acf1.webp?size=32" className="rounded-circle" height="32" alt="Discord Profile Picture" loading="lazy" />
                                        Siebe#0001
                                    </span>
                                }>
                                    <NavDropdown.Item as={Link} to="/ban-appeal">Ban Appeal</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/report">Report User</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/logout" className="text-danger">Logout</NavDropdown.Item>
                                </NavDropdown>
                                {/* <Nav.Link as={Link} to="/login">Login&nbsp;Via&nbsp;Discord</Nav.Link> */}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </Container>
    )
}

export default NavbarComponent