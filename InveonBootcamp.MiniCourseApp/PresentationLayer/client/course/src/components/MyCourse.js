import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer"; 

function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Token bulunamadı.");
        }

      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedToken = JSON.parse(atob(base64));

      const email = decodedToken.email;

        const response = await axios.get(`https://localhost:7037/api/UserCourse?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data); 
      } catch (error) {
        console.error("Kurs verisi çekilirken hata oluştu:", error);
      }
    };

    fetchCourses();
  }, []);


  return (
    <div>

      <NavbarComponent />

      <div className="course-container">
        <h2>Kurslarım</h2>
        <div className="course-list">
          {courses.length > 0 ? (
            courses.map((course) => (
              <Card key={course.id} className="course-card" style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{course.instructor}</Card.Subtitle>
                  <Card.Text>
                    <strong>Açıklama:</strong> {course.description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Fiyat:</strong> {course.price.toFixed(2)} TL <br />
                    <strong>Kategori:</strong> {course.categoryName}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>Kurslar yükleniyor...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyCourses;
