import React from "react";
import "./toggle.css";
import { CircleSmall } from "lucide-react";
import { useTheme } from "../../../context/theme-context.js";

const ToggleButton = ({
  value = false,
  onPress,
  className = "",
  onLabel = "On",
  offLabel = "Off",
}) => {

  const { theme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => onPress(!value)}
      className={
        value ? `toggle-btn-open ${className}` : `toggle-btn-close ${className}`
      }
    >
      <span
        className={`track ${value ? "open-true" : "open-false"} ${
          theme === "dark" ? "dark" : "light"
        }`}
      >
        <CircleSmall
     
          aria-label="Clear Objects"
          role="button"
          tabIndex={0}
          className={`thumb ${theme === "dark" ? "dark" : "light"} toggle ${
            value ? "open-true" : "open-false"
          }`}
          color="var(--main-accent-color-alt)"
          fill={
            value ? "var(--main-accent-color-alt)" : "var(--text-color-invert)"
          }
          strokeWidth={2.25}
        />
      </span>

      <span className={`toggle-label ${value ? "open-true" : "open-false"}`}>
        {value ? onLabel : offLabel}
      </span>
    </button>
  );
};

export default ToggleButton;
