import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../Context/Logincontext';
import { Link,useNavigate } from 'react-router-dom';
export default function Navbars() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, acess } = useAuth();
const handlelogout=()=>{
  logout();
  navigate('/login')
}
  return (
    <>
      <Navbar style={isLoggedIn ? { display: "block" } : { display: "none" }} collapseOnSelect fixed='top' expand="lg" className="bg-body-info bg-info">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link style={{ textDecoration: "none", color: "inherit" }} to={
                  acess.role === "admin" ? "/std_profile" :
                    acess.role === "work" ? "/student" :
                    acess.role === "superadmin"?"/std_profile":"/" 
                      
                }>Student</Link>
              </Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link>
                <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }} onClick={handlelogout}>Logout</Link>
              </Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
