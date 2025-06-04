import "./liked-flag.css";
import PropTypes from 'prop-types';
import { useTheme } from "../../../context/theme-context.js";
import likedlight from "../../img/icons/icon-likes-large-light.png";
import likeddark from "../../img/icons/icon-likes-large-dark.png";

function LikedFlag({ liked }) {
    
const { theme } = useTheme();
  return (
    <div className={`liked-flag ${theme}`}>
     <img
        src={theme === "dark" ? likeddark : likedlight}
        alt="Liked Icon"
        className={`liked-icon ${liked ? 'liked-true' : 'liked-false'}`}
      />
    </div>
  );
}
LikedFlag.propTypes = {
  liked: PropTypes.bool.isRequired,
};

export default LikedFlag;