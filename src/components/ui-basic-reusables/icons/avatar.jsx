import { useTheme } from "../../../context/theme-context";
import hardcodedUser from "../../../context/hardcoded-user";
import userDark from "../../img/user/default-user-dark_web.png";
import userLight from "../../img/user/default-user-light_web.png";

function Avatar({ className }) {
  const { theme } = useTheme();
  const user = hardcodedUser;
  return (
    <img
      src={
        user.pictureUrl
          ? user.pictureUrl
          : theme === "dark"
            ? userDark
            : userLight
      }
      alt="User avatar"
      className={className}
    />
  );
}

export default Avatar;