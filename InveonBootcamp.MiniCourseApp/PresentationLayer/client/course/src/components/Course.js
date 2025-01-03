import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent"; 
import '../styles/course.css'; 

function Course() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {/* NavbarComponent burada ekleniyor */}
      <NavbarComponent />
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
                <Button variant="primary" href={`/course/${course.id}`}>
                  Detayları Gör
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
