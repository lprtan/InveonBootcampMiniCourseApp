import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import "../styles/courseanalytics.css";
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer";

const CourseAnalytics = () => {
  const [courses, setCourses] = useState([]);
  const [instructorEmail, setInstructorEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchInstructorData = () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.error("Token bulunamadı.");
        return;
      }

      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedToken = JSON.parse(atob(base64));

      const email = decodedToken.email;
      setInstructorEmail(email);
    };

    fetchInstructorData();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!instructorEmail) return;

      try {
        const response = await axios.get(
          `https://localhost:7037/api/Course/CourseAnalytics?email=${instructorEmail}`
        );
        setCourses(response.data || []);
        setTotalPages(Math.ceil(response.data.length / coursesPerPage));
      } catch (error) {
        console.error("Kurslar alınırken hata oluştu:", error);
      }
    };

    fetchCourses();
  }, [instructorEmail]);

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Bu kursu silmek istediğinizden emin misiniz?")) {
      try {
        await axios.delete(`https://localhost:7037/api/Course?id=${courseId}`);
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseId)
        );
        alert("Kurs başarıyla silindi!");
      } catch (error) {
        console.error("Kurs silinirken hata oluştu:", error);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  return (
    <>
    <NavbarComponent />
    <div className="analytics-container">
      <h2 className="analytics-header">Kurs Analiz Sayfası</h2>
      <div className="course-grid">
        {currentCourses.map((course) => (
          <div key={course.id} className="course-card">
            <h3 className="course-title">{course.title}</h3>
            <p>
              <strong>Eğitmen:</strong> {course.instructor}
            </p>
            <p>
              <strong>Kategori:</strong> {course.categoryName}
            </p>
            <h4>Öğrenciler</h4>
            <ul>
              {course.students && course.students.length > 0 ? (
                course.students.map((student, index) => (
                  <li key={index}>
                    {student.fullName} ({student.email})
                  </li>
                ))
              ) : (
                <p>Henüz öğrenci yok.</p>
              )}
            </ul>
            <button
              className="delete-button"
              onClick={() => handleDeleteCourse(course.id)}
            >
              Sil
            </button>
          </div>
        ))}
      </div>


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

    <Footer />
    </>
  );
};

export default CourseAnalytics;
