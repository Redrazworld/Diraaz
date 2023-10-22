import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Form, InputGroup, Button } from 'react-bootstrap';
import "../assets/styles/Navbar.css"

function Navbarcomponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className='cont'>
        <Navbar.Brand href="#home" className='mr-auto name'>DIRAAZ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className='navlink'>Home</Nav.Link>
            <Nav.Link href="#link" className='navlink'>Our Story</Nav.Link>
            <Nav.Link href="#link" className='navlink'>Our Products</Nav.Link>
            <Nav.Link href="#link" className='navlink'>Opportunities</Nav.Link>
            <Nav.Link href="#link" className='navlink'>Blog</Nav.Link>
            <Nav.Link href="#link" className='navlink'>Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
      </Container>

      
    </Navbar>
  );
}

export default Navbarcomponent;