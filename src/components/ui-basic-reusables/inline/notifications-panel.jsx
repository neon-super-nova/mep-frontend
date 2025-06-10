import React from "react";
import { useNavigate } from "react-router-dom";
import "./notifications-panel.css";
import { Bell, X } from "lucide-react";

function NotificationsPanel({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="notifications-panel">
      <div className="notifications-panel-body">
        <div className="notification-item">
          <Bell
            color="var(--text-color-dropdown)"
            fill="var(--star-coloring)"
            strokeWidth={0.5}
            size={12}
          />
          <span style={{ width: "0.15rem" }}></span>
          You have a new message!
        </div>
        <span style={{ width: "0.05rem" }}></span>
        <button
          onClick={() => {
            onClose();
            navigate("/notifications");
          }}
          className="notification-link"
        >
          View
        </button>
        <div className="notifications-panel-close">
          <button onClick={onClose} className="notifications-panel-close">
            {" "}
            <X
              color="var(--accent-color-neutral-white)"
              strokeWidth={0.75}
              size={12}
            />{" "}
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPanel;
