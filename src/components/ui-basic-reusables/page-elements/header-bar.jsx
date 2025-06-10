import { Link } from "react-router-dom";
import logoLightModeWeb from "../../img/logos/logoLightModeWeb.png";
import logoDarkModeWeb from "../../img/logos/logoDarkModeWeb.png";
import UserDropdown from "../dropdown-menus/user-dropdown";
import "../page-elements/header-bar.css";
import { useTheme } from "../../../context/theme-context.js"; 

function HeaderBar() {
  const { theme } = useTheme();
  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <header className="comp-header">
        <div className="comp-header-left">
        <Link to="/home" className="comp-logo-link">
          <img
            src={theme === "dark" ? logoDarkModeWeb : logoLightModeWeb}
            alt="Logo"
            className="comp-logo"
          />
        </Link>
        </div>
        <div className="comp-header-right">
        <UserDropdown />
        </div>
      </header>
    </div>
  );
}


export default HeaderBar;