import React from "react";
import { createPortal } from "react-dom";
import "./modal.css"; 
import { useTheme } from "../../../context/theme-context.js";

function Modal({ open, onClose, children }) {
  const { theme } = useTheme();
  if (!open) return null;

  return createPortal(
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;