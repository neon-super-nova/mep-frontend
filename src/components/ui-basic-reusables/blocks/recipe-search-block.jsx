import "./recipe-search-block.css";
import { useNavigate } from "react-router-dom";
import LikedFlag from "../labels/liked-flag.jsx";
import dummyImgDark from "../../img/recipe-box/dummydarkgreen.jpg";
import dummyImgLight from "../../img/recipe-box/dummybeige.jpg";
import { useTheme } from "../../../context/theme-context.js";

function RecipeSearchBlock({ recipe, type }) {

  const { theme } = useTheme();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(recipe.pageURL || "/");
  };

  return (
    <div className="recipe-search-block-container" onClick={handleClick}>
      <LikedFlag liked={recipe.userLiked} />
      <div className="recipe-search-block-image">
         <img
           className="recipe-search-block-thumbnail"
      src={
        recipe.imageUrl
          ? recipe.imageUrl
          : theme === "dark"
            ? dummyImgDark
            : dummyImgLight
      }
      alt={recipe.name}
    
    />
      </div>
      <div className="recipe-search-block-text">
        <h3 className="recipe-search-block-title">{recipe.name}</h3>
        <p className="recipe-search-block-name">
          <span>{type === "submitted" ? "Submitted by" : "Saved by"}</span>{" "}
        </p>
        <p className="recipe-search-block-name">
          <span className="author">
            {recipe.firstName} {recipe.lastName}
          </span>
        </p>
        <p className="recipe-search-block-name">
          <span className="author">
            ({recipe.username})
          </span>
        </p>
      </div>
    </div>
  );
}

export default RecipeSearchBlock;
