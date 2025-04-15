import React from "react";
import { useNavigate } from "react-router-dom";

function UserDropdown() {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    console.log("Logout button clicked!");
    navigate("/");
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
