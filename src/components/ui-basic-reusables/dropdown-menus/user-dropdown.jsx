import React from "react";
import axios from "axios";
import { getToken, deleteToken } from "../../../context/tokens.js";
import { useNavigate } from "react-router-dom";

function UserDropdown() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const currToken = getToken();

    try {
      await axios.post(
        "/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${currToken}`,
          },
        }
      );
      deleteToken(currToken);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
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
