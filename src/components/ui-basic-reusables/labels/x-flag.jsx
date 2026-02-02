import "./x-flag.css";
import PropTypes from "prop-types";
import { useTheme } from "../../../context/theme-context.js";

import { SquareX } from "lucide-react";

function XFlag({ clear, show }) {

  const { theme } = useTheme();
  if (!show) return null;

  return (
<div>
  <div className={`x-flag ${theme}`}>
    <SquareX
      onClick={() => clear()}
      aria-label="Clear Objects"
      role="button"
      tabIndex={0}
      className={`x-icon-tab ${theme === "dark" ? "dark" : "light"} x-icon ${
        clear ? "x-true" : "x-false"
      }`}
      color="var(--minor-accent-color-3)"
      fill="var(--bg-panel-color-alt)"
      strokeWidth={2.5}
      size={12}
    />
  </div>
</div>
  );
}
XFlag.propTypes = {
  clear: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
};

export default XFlag;
XFlag.propTypes = {
  clear: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
