import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import '../styles/login.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post('https://localhost:7037/api/Auth/Login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("Başarıyla giriş yapıldı", response.data);

        localStorage.setItem("accessToken", response.data.data.accessToken);

        navigate("/course");
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      setErrorMessage("Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="login-main">
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-center">
            <h2>Hoş Geldiniz</h2>
            <p>Lütfen bilgilerinizi giriniz</p>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Lütfen e-mail bilginizi girin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Lütfen şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              <div className="login-center-buttons">
                <button type="submit">Giriş yap</button>
              </div>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>

          <p className="login-bottom-p">
              Hesabınız yok mu? <Link to="/register">Kayıt ol</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
