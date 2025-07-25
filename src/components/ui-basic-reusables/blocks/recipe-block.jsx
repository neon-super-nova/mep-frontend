import "./recipe-block.css";
import { useNavigate } from "react-router-dom";
import LikedFlag from "../labels/liked-flag.jsx";
import dummyImgDark from "../../img/recipe-box/dummydarkgreen.jpg";
import dummyImgLight from "../../img/recipe-box/dummybeige.jpg";
import { useTheme } from "../../../context/theme-context.js";

function RecipeBlock({ recipe, type }) {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className="recipe-block-container"
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
        <p className="recipe-block-name">
          <span>Submitted by</span>{" "}
        </p>
        <p className="recipe-block-name">
          <span className="author">{recipe.authorName}</span>
        </p>
        <p className="recipe-block-name">
          <span className="author-username">({recipe.username})</span>
        </p>
      </div>
    </div>
  );
}

export default RecipeBlock;
