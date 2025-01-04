import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import ProfileMenu from "./ProfileMenu"; // ProfileMenu bileşenini içe aktardık
import "../styles/navbar.css";

function NavbarComponent({ cartCount, onCartIconClick, onProfileClick, onLogoutClick }) {
  const token = localStorage.getItem("accessToken");
  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userRole = decodedToken
    ? decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    : null;

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="navbar">
      <Container className="navbar-container">
        <Navbar.Brand href="/course" className="navbar-brand">
          MyCourse
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/course">Ana Sayfa</Nav.Link>
          <Nav.Link href="/myCourse">Kurslarım</Nav.Link>
          {userRole === "Instructor" && <Nav.Link href="/courseForm">Kurs Ekle</Nav.Link>}
          {userRole === "Instructor" && <Nav.Link href="/CourseAnalytics">Kurs ve Öğrenci Yönet</Nav.Link>}
        </Nav>
        <Nav className="ml-auto navbar-icons">
          <Nav.Link onClick={onCartIconClick}>
            <div className="cart-icon-container">
              <FaShoppingCart size={24} color="#fff" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </div>
          </Nav.Link>
          <ProfileMenu onProfileClick={onProfileClick} onLogoutClick={onLogoutClick} />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
