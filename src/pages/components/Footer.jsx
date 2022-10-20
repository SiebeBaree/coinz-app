import '../style/Navbar.css'

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
                            <Nav.Link href="/store">Store</Nav.Link>
                            <Nav.Link href="/discord">Support Server</Nav.Link>
                            <Nav.Link href="/invite">Invite</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            <Nav.Link href="/tos">Terms of Service</Nav.Link>
                            <Nav.Link href="/privacy-policy">Privacy Policy</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    )
}

export default FooterComponent