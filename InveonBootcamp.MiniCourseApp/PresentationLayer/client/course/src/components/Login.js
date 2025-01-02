import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import '../styles/login.css';

const Login = () => {
  const [ showPassword, setShowPassword ] = useState(false);


  return (
    <div className="login-main">
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-center">
            <h2>Hoş Geldiniz</h2>
            <p>Lütfen bilgilerinizi giriniz</p>
            <form>
              <input type="email" placeholder="Lütfen e-mail bilginizi girin" />
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Lütfen şifrenizi girin" />
                {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
                
              </div>

              <div className="login-center-options">
              </div>
              <div className="login-center-buttons">
                <button type="button">Giriş yap</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Hesabınız yok mu? <a href="#">Kayıt ol</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;