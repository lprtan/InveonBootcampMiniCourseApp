import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import CartModal from "./CartModal";
import '../styles/course.css';
import Footer from "./Footer";
import { FaSearch } from "react-icons/fa";

function Course() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:7037/Api/Course")
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((err) => {
        setError("Kurslar yüklenirken bir hata oluştu.");
      });
  }, []);

  const handleAddToCart = (course) => {
    setCartItems([...cartItems, course]);
  };

  const handleRemoveFromCart = (courseId) => {
    setCartItems(cartItems.filter((item) => item.id !== courseId));
  };

  const handleCartModalToggle = () => {
    setShowCartModal(!showCartModal);
  };

  const handleConfirmCart = () => {
    alert("Sepet onaylandı!");
    setCartItems([]);
    setShowCartModal(false);
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <NavbarComponent cartCount={cartItems.length} onCartIconClick={handleCartModalToggle} />

      <div class="header-section">
        <h2 class="header-title">Kurslar</h2>
      </div>
      
      <div className="search-bar">
      <InputGroup className="search-bar">
            <FormControl
              placeholder="Kurs ara..."
              aria-label="Kurs ara"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
      </InputGroup>
      </div>

      <div className="course-container">
        <div className="course-list">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="course-card">
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {course.instructor}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Açıklama:</strong> {course.description}
                </Card.Text>
                <Card.Text>
                  <strong>Fiyat:</strong> {course.price.toFixed(2)} TL <br />
                  <strong>Kategori:</strong> {course.categoryName}
                </Card.Text>
                <Button variant="primary" onClick={() => handleAddToCart(course)}>
                  Sepete Ekle
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      <CartModal
        show={showCartModal}
        handleClose={handleCartModalToggle}
        cartItems={cartItems}
        handleRemoveFromCart={handleRemoveFromCart}
        handleConfirmCart={handleConfirmCart}
      />


      <Footer />
    </>
  );
}

export default Course;
