import React, { useState, useRef } from "react";
import "./dropdown.css";
import axios from "axios";
import {
  getToken,
  deleteToken,
  deleteUserAvatar,
} from "../../../context/tokens.js";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "../../../context/theme-context.js";
import Avatar from "../icons/avatar.jsx";
import ModalReport from "../modals/modal-report.jsx";
import NotificationsPanel from "../inline/notifications-panel.jsx";

function UserDropdown() {
  const navigate = useNavigate();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const optionRefs = useRef([]);
  const { theme, toggleTheme } = useTheme();
  const [modalOpen, setModalOpen] = useState(null);

  const [avatarRefresh] = useState(0);

  const options = [
    {
      value: "profile",
      label: "Profile",
      description: "Customize user blah blah blah",
      labelClass: "dropdown-label-default",
      descriptionClass: "dropdown-description-default",
    },
    {
      value: "notifications",
      label: "Notifications",
      description: "Customize user blah blah blah",
      labelClass: "dropdown-label-default",
      descriptionClass: "dropdown-description-default",
    },
    {
      value: "lightdark",
      label: (
        <span className="day-night-label-span">
          <Sun
            className={`sun ${theme === "dark" ? "dark" : "light"}`}
            color={theme === "dark" ? "#eda65a" : "#f5de9f"}
            fill={theme === "dark" ? "#eda65a" : "#f5de9f"}
            strokeWidth={1.5}
            size={28}
          />
          <span className="divider">|</span>
          <Moon
            className={`moon ${theme === "dark" ? "dark" : "light"}`}
            color={theme === "dark" ? "#db6443" : "#3b4a4d"}
            fill={theme === "dark" ? "#db6443" : "#3b4a4d"}
            strokeWidth={1.5}
            size={28}
          />
          <span className={`mode-label ${theme === "dark" ? "dark" : "light"}`}>
            Mode
          </span>
        </span>
      ),
      labelClass: "day-night-label",
    },
    {
      value: "recipebox",
      label: "Recipe Box",
      description: "Customize user blah blah blah",
      labelClass: "dropdown-label-default",
      descriptionClass: "dropdown-description-default",
    },
    {
      value: "submitreport",
      label: "Submit A Report",
      description: "Customize user blah blah blah",
      labelClass: "dropdown-label-default",
      descriptionClass: "dropdown-description-default",
    },
    {
      value: "logout",
      label: "Logout",
      labelClass: "logout-label",
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
    if (value === "notifications") {
      setModalOpen("modal-notifications");
      setOpen(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((prev) => Math.min(prev + 1, options.length - 1));
      optionRefs.current[selectedIdx + 1]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((prev) => Math.max(prev - 1, 0));
      optionRefs.current[selectedIdx - 1]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(options[selectedIdx].value, selectedIdx);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <>
      <div className={theme === "dark" ? "dark" : ""}>
        <div className="dropdown-trigger-wrapper">
          <button
            className="dropdown-trigger"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <span className="user-menu-span">
              <Avatar className="user-avatar" refreshTrigger={avatarRefresh} />
              <span className="user-menu-text">User Menu</span>
              <ChevronDown
                color="var(--text-color-alt)"
                strokeWidth={5}
                size={12}
              />
            </span>
          </button>
          {open && (
            <div
              className="custom-dropdown-menu"
              role="listbox"
              tabIndex={0}
              aria-activedescendant={`dropdown-option-${selectedIdx}`}
              onFocus={() => setOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setOpen(false);
                }
              }}
              onKeyDown={handleKeyDown}
            >
              {options.map((option, idx) => (
                <React.Fragment key={option.value}>
                  <div
                    id={`dropdown-option-${idx}`}
                    role="option"
                    aria-selected={selectedIdx === idx}
                    tabIndex={-1}
                    ref={(el) => (optionRefs.current[idx] = el)}
                    className={selectedIdx === idx ? "selected" : ""}
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
                  {/* Inline notifications panel */}
                  {option.value === "notifications" &&
                    modalOpen === "modal-notifications" && (
                      <div
                        className={
                          modalOpen
                            ? "dropdown-notifications-panel-wrapper-open"
                            : "dropdown-notifications-panel-wrapper"
                        }
                      >
                        <NotificationsPanel
                          onClose={() => setModalOpen(null)}
                        />
                      </div>
                    )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      <ModalReport
        open={modalOpen === "modal-report"}
        onClose={() => setModalOpen(null)}
      />
    </>
  );
}

export default UserDropdown;
