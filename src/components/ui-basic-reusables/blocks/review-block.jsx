import NewStarRating from "../icons/star-rating.jsx";
import avatarLight from "../../img/user/default-user-light_web.png";
import avatarDark from "../../img/user/default-user-dark_web.png";
import { useTheme } from "../../../context/theme-context.js";
import "../../../page-css/recipe-page.css";

function ReviewBlock({ createdAt, pictureUrl, username, rating, comment }) {
  const { theme } = useTheme();
  return (
    <div className="review-item">
      <div className="reviews-true-top">
        <div className="reviews-true-person">
          <span className="reviews-true-avatar">
            <img
              src={
                pictureUrl
                  ? pictureUrl
                  : theme === "dark"
                  ? avatarDark
                  : avatarLight
              }
              alt={`${username}'s avatar`}
              className="reviews-true-avatar-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = theme === "dark" ? avatarDark : avatarLight;
              }}
            />
          </span>
          <span className="reviews-true-username">{username}</span>
        </div>
        <span className="reviews-true-date">
          {new Date(createdAt).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })}{" "}
          at{" "}
          {new Date(createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      </div>
      <span className="reviews-true-rating">
        <span className="star">
          <NewStarRating rating={parseFloat(rating.toFixed(2))} />
        </span>
        <span className="text-rate"> {parseFloat(rating.toFixed(2))} / 5 stars</span>
      </span>
      <span className="reviews-true-comment">{comment}</span>
    </div>
  );
}

export default ReviewBlock;
