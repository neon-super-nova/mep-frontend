import { useNavigate } from "react-router-dom";
import "./trending-recipe.css";

function TrendingRecipe({
  recipeId,
  recipeImage,
  recipeName,
  recipeDescription,
}) {
  const navigate = useNavigate();
  return (
    <div className="trending-recipe-container">
      <img
        className="trending-recipe-img"
        alt={recipeName}
        src={recipeImage}
        onClick={() => navigate(`/recipe/${recipeId}`)}
      />
      <div className="trending-user-rating-label">
        <span className="trending-recipe-title">{recipeName}:</span>
        <span className="trending-recipe-description">
          {recipeDescription
            ? recipeDescription
            : "A delicious recipe submitted by a fabulous user like you!"}
        </span>
      </div>
    </div>
  );
}

export default TrendingRecipe;
