import "./recipe-block.css";
import { useNavigate } from "react-router-dom";
import LikedFlag from "../labels/liked-flag.jsx";
import dummyImgDark from "../../img/recipe-box/dummydarkgreen.jpg";
import dummyImgLight from "../../img/recipe-box/dummybeige.jpg";
import { useTheme } from "../../../context/theme-context.js";

function RecipeBlockSubmit({ recipe, currentUsername }) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isOwner =
    Boolean(recipe?.username) && Boolean(currentUsername) && recipe.username === currentUsername;
  const submittedDate = recipe?.createdAt
    ? new Date(recipe.createdAt).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : null;

  return (
    <div
      className="recipe-block-container submit"
      onClick={() => navigate(`/recipe/${recipe._id}`)}
    >
      <LikedFlag liked={recipe.userLiked} />
      <div className="recipe-block-image">
        <img
          className="recipe-block-thumbnail"
          src={
            Array.isArray(recipe.imageUrls) && recipe.imageUrls.length > 0
              ? recipe.imageUrls[0]
              : theme === "dark"
              ? dummyImgDark
              : dummyImgLight
          }
          alt={recipe.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = theme === "dark" ? dummyImgDark : dummyImgLight;
          }}
        />
      </div>
      <div className="recipe-block-text">
        <h3 className="recipe-block-title">{recipe.name}</h3>
        {isOwner ? (
          <p className="recipe-block-name">
            <span>Submitted on </span>
            <span className="date">{submittedDate ?? "--/--/----"}</span>
          </p>
        ) : (
          <p className="recipe-block-name">
            <span>Submitted by </span>
            <span className="author">{recipe.authorName}</span>
            <span className="author-username"> ({recipe.username})</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default RecipeBlockSubmit;
