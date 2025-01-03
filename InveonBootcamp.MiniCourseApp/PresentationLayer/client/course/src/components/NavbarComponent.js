import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart, FaUser } from 'react-icons/fa'; 
import '../styles/navbar.css';

function NavbarComponent() {

  const token = localStorage.getItem("accessToken");
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const userRole = decodedToken ? decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="navbar">
        <Container className="navbar-container">
          <Navbar.Brand href="#home" className="navbar-brand">MyCourse</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Ana Sayfa</Nav.Link>
            <Nav.Link href="#courses">Kurslarım</Nav.Link>
            {userRole === "Instructor" && <Nav.Link href="#instructor">Eğitmen Sayfası</Nav.Link>}
          </Nav>
          <Nav className="ml-auto navbar-icons">
            <Nav.Link href="#cart">
              <FaShoppingCart size={24} color="#fff" />
            </Nav.Link>
            <Nav.Link href="#profile">
              <FaUser size={24} color="#fff" />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
