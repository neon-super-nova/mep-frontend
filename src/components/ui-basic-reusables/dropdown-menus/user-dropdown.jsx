import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, deleteToken } from "../../../context/tokens.js";

function UserDropdown() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = getToken();
    try {
      await axios.post("http://localhost:8080/api/users/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      deleteToken();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleChange = (e) => {
    if (e.target.value === "logout") {
      handleLogout();
    }
  };

  return (
    <div className="user-dropdown">
      <select onChange={handleChange}>
        <option value="profile">Profile</option>
        <option value="settings">Settings</option>
        <option value="logout">Logout</option>
      </select>
    </div>
  );
}

export default UserDropdown;
