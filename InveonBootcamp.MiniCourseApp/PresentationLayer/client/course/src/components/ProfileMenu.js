import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import "../styles/profilMenu.css";

function ProfileMenu({ onProfileClick, onLogoutClick }) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="light"
        id="dropdown-basic"
        className="profile-icon-toggle"
      >
        <FaUser className="profile-icon" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={onProfileClick}>
          <FaUser style={{ marginRight: "8px" }} /> Profil
        </Dropdown.Item>
        <Dropdown.Item onClick={onLogoutClick}>
          <FaSignOutAlt style={{ marginRight: "8px" }} /> Çıkış Yap
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfileMenu;

