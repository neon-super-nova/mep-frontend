
import React, { useState, useRef } from "react";
import "./mobiledrop.css";
import axios from "axios";
import {
  getToken,
  deleteToken,
  deleteUserAvatar,
} from "../../../context/tokens.js";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../../context/theme-context.js";
import ModalReport from "../modals/modal-report.jsx";
import { Turn as Hamburger } from "hamburger-react";


function MobileDropdown() {
  const navigate = useNavigate();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const optionRefs = useRef([]);
  const { theme, toggleTheme } = useTheme();
  const [modalOpen, setModalOpen] = useState(null);

  const options = [
    {
      value: "profile",
      label: "Profile",
      labelClass: "mobile-dropdown-label-default",
    },
    {
      value: "notifications",
      label: "Notifications",
      labelClass: "mobile-dropdown-label-default",
    },
    {
      value: "lightdark",
      label: (
        <span className="mobile-day-night-label-span">
          <Sun
            className={`sun ${theme === "dark" ? "dark" : "light"}`}
            color={theme === "dark" ? "#eda65a" : "#f5de9f"}
            fill={theme === "dark" ? "#eda65a" : "#f5de9f"}
            strokeWidth={1.5}
            size={28}
          />
          <span className="mobile-divider">|</span>
          <Moon
            className={`moon ${theme === "dark" ? "dark" : "light"}`}
            color={theme === "dark" ? "#db6443" : "#3b4a4d"}
            fill={theme === "dark" ? "#db6443" : "#3b4a4d"}
            strokeWidth={1.5}
            size={28}
          />
        </span>
      ),
      labelClass: "mobile-day-night-label",
    },
    {
      value: "recipebox",
      label: "Recipe Box",
      labelClass: "mobile-dropdown-label-default",
    },
    {
      value: "submitreport",
      label: "Submit A Report",
      labelClass: "mobile-dropdown-label-default",
    },
    {
      value: "logout",
      label: "Logout",
      labelClass: "mobile-logout-label",
    },
  ];

  const handleLogout = async () => {
    const currToken = getToken();
    deleteToken(currToken);

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
      deleteUserAvatar();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSelect = (value, idx) => {
    setSelectedIdx(idx);
    setOpen(false);
    if (value === "logout") handleLogout();
    if (value === "lightdark") toggleTheme();
    if (value === "profile") navigate(`/profile`);
    if (value === "recipebox") navigate("/recipebox");
    if (value === "submitreport") setModalOpen("modal-report");
    if (value === "notifications") navigate("/notifications");
  };

  const ref = useRef(null);


  return (
    <div ref={ref}>
      <div className="mobile-dropdown">
        <div className="mobile-dropdown-placement">
          <Hamburger
            toggled={open}
            toggle={setOpen}
            color="var(--main-accent-color-alt)"
          />
        </div>
          {open && (
            <div className="mobile-dropdown-menu"> 
              {options.map((option, idx) => (
                <React.Fragment key={option.value}>
                  <div
                    id={`dropdown-option-${idx}`}
                    role="option"
                    aria-selected={selectedIdx === idx}
                    tabIndex={-1}
                    ref={(el) => (optionRefs.current[idx] = el)}
                    className={`mobile-dropdown-item ${selectedIdx === idx ? "selected" : ""}`}
                    onClick={() => handleSelect(option.value, idx)}
                  >
                    <div className={`option-label ${option.labelClass || ""}`}>
                      {option.label}
                    </div>
                    {option.description && (
                      <div
                        className={`option-description ${
                          option.descriptionClass || ""
                        }`}
                      >
                        {option.description}
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
      </div>

      <ModalReport
        open={modalOpen === "modal-report"}
        onClose={() => setModalOpen(null)}
      />
    </div>
  );
}

export default MobileDropdown;