import "../page-css/recipe-page.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/theme-context";
import StarRating from "../components/ui-basic-reusables/icons/star-rating";
import RecipeTags from "../components/ui-basic-reusables/labels/label-tag-food";
import lightcutlery from "../components/img/icons/icon-cutlery-light.png";
import lighttimer from "../components/img/icons/icon-timer-light.png";
import lightmeasure from "../components/img/icons/icon-measure-light.png";
import darkcutlery from "../components/img/icons/icon-cutlery-dark.png";
import darktimer from "../components/img/icons/icon-timer-dark.png";
import darkmeasure from "../components/img/icons/icon-measure-dark.png";
import axios from "axios";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import dummyV1 from "../components/img/dummy/placeholder_1.jpg";

function RecipePage() {
  const { recipeId } = useParams();
  const { theme } = useTheme();
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [recipeStats, setRecipeStats] = useState({
    averageReview: 0,
    reviewCount: 0,
    likeCount: 0,
  });

  useEffect(() => {
    async function fetchRecipeInfo() {
      try {
        const response = await axios.get(`/api/recipes/${recipeId}`);
        const recipeData = response.data.recipe;
        setRecipe(recipeData);

        if (recipeData && recipeData.userId) {
          const userResponse = await axios.get(
            `/api/users/${recipeData.userId}`
          );
          setUser(userResponse.data.userInfo);
        }
      } catch (err) {
        setRecipe(null);
        setUser(null);
      }
    }
    fetchRecipeInfo();
  }, [recipeId]);

  useEffect(() => {
    async function fetchRecipeStats() {
      try {
        const response = await axios.get(
          `/api/recipes/${recipeId}/recipe-stats`
        );
        console.log(response.data);
        setRecipeStats({
          averageReview: response.data.averageReview
            ? response.data.averageReview
            : 0,
          reviewCount: response.data.reviewCount
            ? response.data.reviewCount
            : 0,
          likeCount: response.data.likeCount ? response.data.likeCount : 0,
        });
      } catch (err) {}
    }
    fetchRecipeStats();
  }, [recipeId]);

  if (recipe === null) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  const units = recipe.units || "US/Imperial";

  return (
    <div className={theme === "dark" ? "dark-mode" : ""}>
      <div className="recipe-page">
        <HeaderBar />
        <header>
          <h1>{recipe.name}</h1>
        </header>
        <main>
          <div className="top">
            <div className="small">
              <h6>
                <span className="bold">Author: </span>
                <span style={{ width: "0.5rem" }}></span>
                <span className="reg">
                  {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
                </span>
              </h6>
              <div style={{ width: "1.75rem" }}></div>
              <h6>
                <span className="bold">submitted on: </span>
                <span style={{ width: "0.5rem" }}></span>
                <span className="reg">
                  {" "}
                  {new Date(recipe.createdAt).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </h6>
            </div>
            <div className="headline">
              <p>{recipe.description || "No description available."}</p>
            </div>
            <div className="image">
              <img
                src={
                  recipe.imageUrls.length > 1 ? recipe.imageUrls[1] : dummyV1
                }
                alt={recipe.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = dummyV1;
                }}
              />
              <img
                src={
                  recipe.imageUrls.length > 0 ? recipe.imageUrls[0] : dummyV1
                }
                alt={recipe.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = dummyV1;
                }}
              />
              <img
                src={
                  recipe.imageUrls.length > 2 ? recipe.imageUrls[2] : dummyV1
                }
                alt={recipe.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = dummyV1;
                }}
              />
            </div>
          </div>
          <div className="middle">
            <div className="recipe-notes">
              <div className="left">
                <h6>
                  <span className="text">User Rating:</span>
                  <span className="star">
                    <StarRating rating={recipeStats.averageReview}></StarRating>
                  </span>
                  <span className="rate">
                    {" "}
                    {recipe.averageRating} / 5 stars
                  </span>
                </h6>
                <RecipeTags recipe={recipe} />
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
                    <span className="reg"> {recipe.cookTime} minutes</span>
                  </h6>
                  <h6>
                    <img
                      src={theme === "dark" ? darktimer : lighttimer}
                      alt="timer or clock icon"
                      className="timer-icon"
                    />
                    <span className="bold"> prep time: </span>
                    <span className="reg"> {recipe.prepTime} minutes</span>
                  </h6>
                  <h6>
                    <img
                      src={theme === "dark" ? darktimer : lighttimer}
                      alt="timer or clock icon"
                      className="timer-icon"
                    />
                    <span className="bold"> total time:</span>
                    <span className="reg">{recipe.totalTime} minutes </span>
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
                    <span className="reg"> {recipe.servings} servings</span>
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
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="right">
                <div className="equip">
                  <h4>Special Equipment</h4>

                  {Array.isArray(recipe.equipment) &&
                  recipe.equipment.length > 0 ? (
                    recipe.equipment.map((equipment, index) => {
                      return <p key={index}>{equipment}</p>;
                    })
                  ) : (
                    <p>None specified</p>
                  )}
                </div>
                <div className="instruct">
                  <h4>Instructions</h4>
                  <ol>
                    {recipe.instructions.map((instructions, index) => (
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
              {recipe.authorNotes.length > 0 ? (
                recipe.authorNotes.map((note, index) => {
                  return <p key={index}>{note} </p>;
                })
              ) : (
                <p>Enjoy!</p>
              )}
            </div>
            <div className="reviews">
              <div className="review-small">
                <h6>
                  <span className="reg">total likes:</span>
                  <span className="bold">{recipeStats.likeCount}</span>
                </h6>
                <h6>
                  <span className="reg">total reviews:</span>
                  <span className="bold">{recipeStats.reviewCount}</span>
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
