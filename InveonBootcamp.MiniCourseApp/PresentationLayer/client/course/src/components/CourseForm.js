import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/courseform.css";
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer";

const CourseForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [instructor, setInstructor] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]); // Defaulting to an empty array
  
    const getEmailFromToken = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return null;
  
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email;  
    };
  
    useEffect(() => {
      const fetchInstructor = async () => {
        const email = getEmailFromToken(); 
        if (email) {
          try {
            const response = await axios.get(`https://localhost:7037/api/User?mail=${email}`);
            setInstructor(response.data.data.fullName);
          } catch (error) {
            console.error("Kullanıcı adı alınırken hata oluştu:", error);
          }
        }
      };
  
      const fetchCategories = async () => {
        try {
          const response = await axios.get("https://localhost:7037/api/Catagory");
          setCategories(response.data || []);
        } catch (error) {
          console.error("Kategoriler alınırken hata oluştu:", error);
        }
      };
  
      fetchInstructor();
      fetchCategories();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newCourse = {
        title,
        description,
        price: parseFloat(price),
        instructor,
        categoryId: parseInt(categoryId),
      };
  
      try {
        await axios.post("https://localhost:7037/api/Course", newCourse);
        alert("Kurs başarıyla eklendi!");

        setTitle("");
        setDescription("");
        setPrice("");
        setCategoryId("");
      } catch (error) {
        console.error("Kurs eklenirken hata oluştu:", error);
      }
    };
  
    return (
      <>
        <NavbarComponent />
        <div className="header-section">
          <h2 className="header-title">Kurs Ekle</h2>
        </div>
        <div className="courseform-container">
          <form onSubmit={handleSubmit} className="courseform-wrapper">
            <div>
              <label htmlFor="title" className="courseform-label">Kurs Başlığı</label>
              <input
                type="text"
                id="title"
                className="courseform-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="courseform-label">Açıklama</label>
              <textarea
                id="description"
                className="courseform-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="price" className="courseform-label">Fiyat</label>
              <input
                type="number"
                id="price"
                className="courseform-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                step="0.01"
              />
            </div>
            <div>
              <label htmlFor="instructor" className="courseform-label">Eğitmen</label>
              <input
                type="text"
                id="instructor"
                className="courseform-input"
                value={instructor}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="category" className="courseform-label">Kategori</label>
              <select
                id="category"
                className="courseform-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="">Kategori Seçin</option>
                {categories.length > 0 && categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="courseform-button">Kursu Ekle</button>
          </form>
        </div>
        <Footer />
      </>
    );
  };
  
  export default CourseForm;
  
