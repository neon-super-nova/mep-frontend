import StarRating from "../icons/star-rating";
import "./trending-recipe.css";
import RecipeTags from "../labels/label-tag-food";

function TrendingRecipe({
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
    <div className="trending-recipe-container">
      <img className="trending-recipe-img" alt={recipeName} src={recipeImage} />
      <div className="trending-recipe-right-side">
        <p className="recipe-title">RECIPE: {recipeName}</p>
        <div className="trending-recipe-user-rating">
          <p className="user-rating-label">USER RATING:</p>
          <StarRating rating={recipeRating} />
          <p className="user-rating-label">{recipeRating}/ 5 stars</p>
        </div>
        <p className="recipe-description">{recipeDescription}</p>
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

export default TrendingRecipe;
