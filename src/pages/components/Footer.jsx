import '../style/Navbar.css'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function FooterComponent() {
    return (
        <Container fluid="lg">
            <Navbar expand="lg">
                <Container fluid="fluid">
                    <Navbar.Brand href="/">Coinz</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="unimportant-content">
                            <Nav.Link as={Link} to="/store">Store</Nav.Link>
                            <Nav.Link as={Link} to="/discord">Support Server</Nav.Link>
                            <Nav.Link as={Link} to="/invite">Invite</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/tos">Terms of Service</Nav.Link>
                            <Nav.Link as={Link} to="/privacy">Privacy Policy</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    )
}

export default FooterComponent