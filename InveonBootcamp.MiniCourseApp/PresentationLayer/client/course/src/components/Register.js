import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate(); // useNavigate burada tanımlanmalı
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerData = {
      fullName: fullName,
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('https://localhost:7037/api/User', registerData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("Başarıyla kayıt yapıldı", response.data);
        navigate("/"); // Başarılı olursa login sayfasına yönlendir
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
      setErrorMessage("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h2>Hoş Geldiniz</h2>
        <p>Lütfen bilgilerinizi girin</p>
      </div>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Ad Soyad"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="pass-input-div">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
          ) : (
            <FaEye onClick={() => setShowPassword(!showPassword)} />
          )}
        </div>
        <button type="submit">Kayıt Ol</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
