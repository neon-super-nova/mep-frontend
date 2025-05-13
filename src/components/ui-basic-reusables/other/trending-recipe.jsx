import StarRating from "../icons/star-rating";
import "./trending-recipe.css";

function TrendingRecipe({
  recipeImage,
  recipeName,
  recipeRating,
  recipeDescription,
  recipeTags,
}) {
  return (
    <div className="trending-recipe-container">
      <img className="trending-recipe-img" alt={recipeName} src={recipeImage} />
      <div className="trending-recipe-right-side">
        <p className="recipe-title">
          <strong>RECIPE:</strong> {recipeName}
        </p>
        <div className="trending-recipe-user-rating">
          <p className="user-rating-label">USER RATING:</p>
          <StarRating rating={recipeRating} />
          <p className="user-rating-label">{recipeRating}/ 5 stars</p>
        </div>
        <p className="recipe-description">{recipeDescription}</p>
        <div className="trending-recipe-tags">
          {recipeTags.map((tag, index) => (
            <p className="recipe-tag" key={index}>
              {tag.toUpperCase()}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingRecipe;
