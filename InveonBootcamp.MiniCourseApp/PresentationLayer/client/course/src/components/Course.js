import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import CartModal from "./CartModal";
import '../styles/course.css';
import Footer from "./Footer";

function Course() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]); 
  const [showCartModal, setShowCartModal] = useState(false); 

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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <NavbarComponent cartCount={cartItems.length} onCartIconClick={handleCartModalToggle} />
      <div className="course-container">
        <h2>Kurslar</h2>
        <div className="course-list">
          {courses.map((course) => (
            <Card key={course.id} className="course-card" style={{ width: "100%" }}>
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
