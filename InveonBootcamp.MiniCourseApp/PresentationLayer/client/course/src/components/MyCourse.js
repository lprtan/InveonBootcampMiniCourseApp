import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Pagination } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer";
import "../styles/mycourse.css"; 

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

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
        setTotalPages(Math.ceil(response.data.length / coursesPerPage));
      } catch (error) {
        console.error("Kurs verisi çekilirken hata oluştu:", error);
      }
    };

    fetchCourses();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  return (
    <div>
      <NavbarComponent />

      <div className="header-section">
        <h2 className="header-title">Kurslarım</h2>
      </div>

     <div>
     <Pagination>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </Pagination>
     </div>

      <div className="my-course-container">
        <div className="my-course-list">
          {currentCourses.length > 0 ? (
            currentCourses.map((course) => (
              <Card key={course.id} className="my-course-card">
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
