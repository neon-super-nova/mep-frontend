import React from "react";
import "./label-input.css";

function RecipeTags({ recipe, noTagsText = "none" } ) {
  const renameProtein = (protein) => {
    if (protein === "Other animal based") return "Meat - other / mixed";
    return protein;
  };
  const noTags =
    (!recipe.cuisineRegion || recipe.cuisineRegion === "Other") &&
    (!recipe.dietaryRestriction || recipe.dietaryRestriction === "None") &&
    (!recipe.proteinChoice || recipe.proteinChoice === "None") &&
    (!recipe.religiousRestriction || recipe.religiousRestriction === "None");

  return (
    <h5 className="food tags-row">
      {/* Tags: */}
      {noTags ? (
        <span className="food bold">{noTagsText}</span>
      ) : (
        <>
          {recipe.cuisineRegion && recipe.cuisineRegion !== "Other" && (
            <span className="food reg cuisine">{recipe.cuisineRegion}</span>
          )}
          {recipe.dietaryRestriction &&
            recipe.dietaryRestriction !== "None" && (
              <span className="food reg diet">{recipe.dietaryRestriction}</span>
            )}
          {recipe.proteinChoice && recipe.proteinChoice !== "None" && (
            <span className="food reg protein">
              {renameProtein(recipe.proteinChoice)}
            </span>
          )}
          {recipe.religiousRestriction &&
            recipe.religiousRestriction !== "None" && (
              <span className="food reg religion">
                {recipe.religiousRestriction}
              </span>
            )}
        </>
      )}
    </h5>
  );
}

export default RecipeTags;
