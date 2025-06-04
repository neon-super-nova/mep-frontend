import "../page-css/recipe-page.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/theme-context";
import StarRating from "../components/ui-basic-reusables/icons/star-rating";
import lightcutlery from "../components/img/icons/icon-cutlery-light.png";
import lighttimer from "../components/img/icons/icon-timer-light.png";
import lightmeasure from "../components/img/icons/icon-measure-light.png";
import darkcutlery from "../components/img/icons/icon-cutlery-dark.png";
import darktimer from "../components/img/icons/icon-timer-dark.png";
import darkmeasure from "../components/img/icons/icon-measure-dark.png";
import axios from "axios";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import dummyV1 from "../components/img/dummy/placeholder_1.jpg";
import dummyV2 from "../components/img/dummy/placeholder_2.jpg";

function RecipePage() {
  const { name } = useParams();
  const { theme } = useTheme();
  const [recipe, setRecipe] = useState(null);

  const renameProtein = (protein) => {
    if (protein === "Other animal based") return "Meat - other / mixed";
    return protein;
  };
  
  useEffect(() => {
    async function fetchRecipe() {
      console.log("Fetching recipe from:", `/api/recipes/name/${name}`);
      try {
        const response = await axios.get(`/api/recipes/name/${name}`);
        console.log("Fetched recipe data:", response.data);
        setRecipe(response.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setRecipe(null);
      }
    }
    fetchRecipe();
  }, [name]);

  if (recipe === null) return <div>Loading...</div>;
  if (!recipe || recipe.length === 0) return <div>Recipe not found.</div>;

  const noTags =
    (!recipe[0].cuisineRegion || recipe[0].cuisineRegion === "Other") &&
    (!recipe[0].dietaryRestriction ||
      recipe[0].dietaryRestriction === "None") &&
    (!recipe[0].proteinChoice || recipe[0].proteinChoice === "None") &&
    (!recipe[0].religiousRestriction ||
      recipe[0].religiousRestriction === "None");

  const units = recipe[0].units || "US/Imperial";

  return (
    <div className={theme === "dark" ? "dark-mode" : ""}>
      <div className="recipe-page">
        <HeaderBar />
        <header>
          <h1>{recipe[0].name}</h1>
        </header>
        <main>
          <div className="top">
            <div className="small">
              <h6>
                <span className="bold">pull up author: </span>
                <span style={{ width: "0.25rem" }}></span>
                <span className="reg">name by user id, </span>
              </h6>
              <div style={{ width: "1.75rem" }}></div>

              <h6>
                <span className="bold">submitted on: </span>
                <span style={{ width: "0.25rem" }}></span>
                <span className="reg">
                  {" "}
                  {new Date(recipe[0].createdAt).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </h6>
            </div>
            <div className="headline">
              <p>
                {" "}
                Headline: At vero eos et accusamus et iusto odio dignissimos
                ducimi s qui blanditiis praesentium voluptatum deleniti atque
                corrupti quos{" "}
              </p>
            </div>
            <div className="image">
              <img
                src={!recipe[0].imageUrl ? dummyV1 : recipe[0].imageUrl}
                alt={recipe[0].name}
              />
              <img src={dummyV2} alt={recipe[0].name} />
              <img src={dummyV1} alt={recipe[0].name} />
            </div>
          </div>
          <div className="middle">
            <div className="recipe-notes">
              <div className="left">
                <h6>
                  <span className="text">User Rating:</span>
                  <span className="star">
                    <StarRating rating={recipe[0].averageRating}></StarRating>
                  </span>
                  <span className="rate">
                    {" "}
                    {recipe[0].averageRating} / 5 stars
                  </span>
                </h6>
                <h5 className="tags-row">
                  Tags:
                  {noTags ? (
                    <span className="bold">none</span>
                  ) : (
                    <>
                      {recipe[0].cuisineRegion &&
                        recipe[0].cuisineRegion !== "Other" && (
                          <span className="reg cuisine">
                            {recipe[0].cuisineRegion}
                          </span>
                        )}
                      {recipe[0].dietaryRestriction &&
                        recipe[0].dietaryRestriction !== "None" && (
                          <span className="reg diet">
                            {recipe[0].dietaryRestriction}
                          </span>
                        )}
                      {recipe[0].proteinChoice &&
                        recipe[0].proteinChoice !== "None" && (
                          <span className="reg protein">
                            {renameProtein(recipe[0].proteinChoice)}
                          </span>
                        )}

                      {recipe[0].religiousRestriction &&
                        recipe[0].religiousRestriction !== "None" && (
                          <span className="reg religion">
                            {recipe[0].religiousRestriction}
                          </span>
                        )}
                    </>
                  )}
                </h5>
              </div>
              <div className="right">
                <div className="times">
                  <h6>
                    <img
                      src={theme === "dark" ? darktimer : lighttimer}
                      alt="timer or clock icon"
                      className="timer-icon"
                    />
                    <span className="bold">cook time:</span>
                    <span className="reg"> {recipe[0].cookTime} minutes</span>
                  </h6>
                  <h6>
                    <img
                      src={theme === "dark" ? darktimer : lighttimer}
                      alt="timer or clock icon"
                      className="timer-icon"
                    />
                    <span className="bold"> prep time: </span>
                    <span className="reg"> {recipe[0].prepTime} minutes</span>
                  </h6>
                  <h6>
                    <img
                      src={theme === "dark" ? darktimer : lighttimer}
                      alt="timer or clock icon"
                      className="timer-icon"
                    />
                    <span className="bold"> total time:</span>
                    <span className="reg">{recipe[0].totalTime} minutes </span>
                  </h6>
                </div>
                <div className="serves">
                  <h6>
                    <img
                      src={theme === "dark" ? darkcutlery : lightcutlery}
                      alt="fork and knife icon"
                      className="cutlery-icon"
                    />
                    <span className="bold"> yield:</span>
                    <span className="reg"> {recipe[0].servings} servings</span>
                  </h6>
                  <h6>
                    <img
                      src={theme === "dark" ? darkmeasure : lightmeasure}
                      alt="measuring cup icon"
                      className="measure-icon"
                    />
                    <span className="bold"> units:</span>
                    <span className="reg">{units}</span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="recipe-details">
              <div className="left">
                <h4>Ingredients</h4>
                <ul>
                  {recipe[0].ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="right">
                <div className="equip">
                  <h4>Special Equipment</h4>
                  <p>
                    maybe add to schema later to include things like
                    corrianders, stand mixer panels (vs handheld electric
                    mixers), dutch ovens or other specialty equipment?
                  </p>
                </div>
                <div className="instruct">
                  <h4>Instructions</h4>
                  <ol>
                    {recipe[0].instructions.map((instructions, index) => (
                      <li key={index}>{instructions}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="author-notes">
              <h3> Author Notes</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{" "}
              </p>
            </div>
            <div className="reviews">
              <div className="review-small">
                <h6>
                  <span className="reg">total likes:</span>
                  <span className="bold">{recipe[0].totalLikes}</span>
                </h6>

                <h6>
                  <span className="reg">total reviews:</span>
                  <span className="bold">{recipe[0].totalReviews}</span>
                </h6>
              </div>
              <h4>REVIEWS:</h4>
              <p>
                will create the hash map for later (need to import other
                database)
              </p>
            </div>
          </div>
        </main>
        <footer className="recipe-page-footer">
          <p>Footer Content</p>
        </footer>
      </div>
    </div>
  );
}

export default RecipePage;
