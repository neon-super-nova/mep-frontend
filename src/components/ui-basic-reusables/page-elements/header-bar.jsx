import { Link } from "react-router-dom";
import logoLightModeWeb from "../../img/logos/logoLightModeWeb.png";
import logoDarkModeWeb from "../../img/logos/logoDarkModeWeb.png";
import UserDropdown from "../dropdown-menus/user-dropdown";
import "../page-elements/header-bar.css";
import { useTheme } from "../../../context/theme-context.js"; 
import { useEffect, useRef } from "react";

function HeaderBar() {
    const aboveRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    if (aboveRef.current && dropdownRef.current) {
      const height = aboveRef.current.offsetHeight;
      dropdownRef.current.style.setProperty('--above-component-height', `${height}px`);
    }
  }, []);

  const { theme } = useTheme();
  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <header ref={aboveRef} className="comp-header">
        <div className="comp-header-left">
        <Link to="/home" className="comp-logo-link">
          <img
            src={theme === "dark" ? logoDarkModeWeb : logoLightModeWeb}
            alt="Logo"
            className="comp-logo"
          />
        </Link>
        </div>
        <div ref={dropdownRef} className="comp-header-right">
        <UserDropdown />
        </div>
      </header>
    </div>
  );
}


export default HeaderBar;