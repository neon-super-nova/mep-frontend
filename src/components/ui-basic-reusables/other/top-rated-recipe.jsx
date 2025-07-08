import StarRating from "../icons/star-rating";
import "./top-rated-recipe.css";
import RecipeTags from "../labels/label-tag-food";

function TopRatedRecipe({
  recipeImage,
  recipeName,
  recipeRating,
  recipeDescription,
  cuisineRegion,
  dietaryRestriction,
  proteinChoice,
  religiousRestriction,
}) {
  return (
    <div className="top-rated-recipe-container">
      <img
        className="top-rated-recipe-img"
        alt={recipeName}
        src={recipeImage}
      />
      <div className="top-rated-recipe-right-side">
        <p className="top-rated-recipe-title">RECIPE: {recipeName}</p>
        <div className="top-rated-recipe-user-rating">
          <p className="user-rating-label">USER RATING:</p>
          <StarRating rating={recipeRating} />
          <p className="top-rated-user-rating-label">{recipeRating}/ 5 stars</p>
        </div>
        <p className="top-rated-recipe-description">{recipeDescription}</p>
        <RecipeTags
          recipe={{
            cuisineRegion,
            dietaryRestriction,
            proteinChoice,
            religiousRestriction,
          }}
        />
      </div>
    </div>
  );
}

export default TopRatedRecipe;
