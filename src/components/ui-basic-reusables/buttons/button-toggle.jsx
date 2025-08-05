import React from "react";
import "./toggle.css";
import { CircleSmall } from "lucide-react";
import { useTheme } from "../../../context/theme-context.js";

const ToggleButton = ({
  onPress,
  className = "",
  onLabel = "On",
  offLabel = "Off",
}) => {
  const [open, setOpen] = React.useState(false);
  const { theme } = useTheme();

  return (
    <button
      type="button"
      onClick={
        open
          ? () => {
              setOpen(false);
              onPress(false);
            }
          : () => {
              setOpen(true);
              onPress(true);
            }
      }
      className={
        open ? `toggle-btn-open ${className}` : `toggle-btn-close ${className}`
      }
    >
      <span
        className={`track ${open ? "open-true" : "open-false"} ${
          theme === "dark" ? "dark" : "light"
        }`}
      >
        <CircleSmall
          onClick={
            open
              ? () => {
                  setOpen(false);
                  onPress(false);
                }
              : () => {
                  setOpen(true);
                  onPress(true);
                }
          }
          aria-label="Clear Objects"
          role="button"
          tabIndex={0}
          className={`thumb ${theme === "dark" ? "dark" : "light"} toggle ${
            open ? "open-true" : "open-false"
          }`}
          color="var(--main-accent-color-alt)"
          fill={
            open ? "var(--main-accent-color-alt)" : "var(--text-color-invert)"
          }
          strokeWidth={2.25}
        />
      </span>

      <span className={`toggle-label ${open ? "open-true" : "open-false"}`}>
        {open ? onLabel : offLabel}
      </span>
    </button>
  );
};

export default ToggleButton;
