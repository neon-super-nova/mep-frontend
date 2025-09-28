import { useNavigate } from "react-router-dom";
import NewStarRating from "../icons/new-star-rating";
import "./top-rated-recipe.css";
import RecipeTags from "../labels/label-tag-food";

function TopRatedRecipe({
  recipeId,
  recipeImage,
  recipeName,
  recipeRating,
  recipeDescription,
  cuisineRegion,
  dietaryRestriction,
  proteinChoice,
  religiousRestriction,
}) {
  const navigate = useNavigate();

  return (
    <div className="top-rated-recipe-container">
      <div className="top-rated-recipe-sub-container">
        <img
          className="top-rated-recipe-img"
          alt={recipeName}
          src={recipeImage}
          onClick={() => navigate(`/recipe/${recipeId}`)}
        />
        <div className="top-rated-recipe-right-side">
          <p className="top-rated-recipe-title">RECIPE: {recipeName}</p>
          <div className="top-rated-recipe-user-rating">
            <p className="user-rating-label">USER RATING:</p>
            <NewStarRating rating={parseFloat(recipeRating.toFixed(2))} strokeWidth={2} size={24} width={16} height={16} />
            <p className="top-rated-user-rating-label">
              {parseFloat(recipeRating.toFixed(2))} / 5 stars
            </p>
          </div>
          <p className="top-rated-recipe-description">{recipeDescription}</p>
        </div>
      </div>
      <RecipeTags
        recipe={{
          cuisineRegion,
          dietaryRestriction,
          proteinChoice,
          religiousRestriction,
        }}
      />
    </div>
  );
}

export default TopRatedRecipe;