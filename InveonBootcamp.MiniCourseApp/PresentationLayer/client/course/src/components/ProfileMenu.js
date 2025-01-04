import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/profilMenu.css";

function ProfileMenu({ onProfileClick }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      await axios.post("https://localhost:7037/api/Auth/RevokeRefreshToken", {
        token: refreshToken,
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      navigate("/");
    } catch (error) {
      console.error("Çıkış yaparken bir hata oluştu:", error);
    }
  };

  const handleMyCoursesClick = () => {
    navigate("/mycourse"); 
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="light" id="dropdown-basic" className="profile-icon-toggle">
        <FaUser className="profile-icon" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleMyCoursesClick}>
          <FaUser style={{ marginRight: "8px" }} /> Eğitimlerim
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>
          <FaSignOutAlt style={{ marginRight: "8px" }} /> Çıkış Yap
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfileMenu;

