import "../page-css/recipe-box-page.css";
import { useTheme } from "../context/theme-context";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";

import dummySaved from "../context/submittedRecipes.json";
import RecipeBlock from "../components/ui-basic-reusables/blocks/recipe-block";
import { ArrowLeft, ArrowRight } from "lucide-react";
import iconImgDark from "../components/img/recipe-box/recipesDark.png";
import iconImgLight from "../components/img/recipe-box/recipesLight.png";
import { getUserId } from "../context/decodeToken.js";
import tinylikedlight from "../components/img/icons/icon-likes-small-light.png";
import tinysavedlight from "../components/img/icons/icon-saves-small-light.png";
import tinylikeddark from "../components/img/icons/icon-likes-small-dark.png";
import tinysaveddark from "../components/img/icons/icon-saves-small-dark.png";
// import tinysubmitlight from "../components/img/icons/icon-submit-small-light.png";
// import tinysubmitdark from "../components/img/icons/icon-submit-small-dark.png";

function RecipeBoxPage() {
  const { theme } = useTheme();
  const [submittedPage, setSubmittedPage] = useState(1);
  const [savedPage, setSavedPage] = useState(1);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const userId = getUserId();
      if (!userId) return;

      try {
        const response = await axios.get(`api/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(response.data.userInfo);
        const username = response.data.userInfo.username;
        setUsername(username);
      } catch (err) {
        if (err.response) {
          alert(err.response.data.error);
        }
      }
    };
    getUser();
  }, []);

  const PAGE_SIZE = 7;

  const savedRecipes = dummySaved || [];
  const savedStart = (savedPage - 1) * PAGE_SIZE;
  const savedEnd = savedStart + PAGE_SIZE;
  const pagedsaved = savedRecipes.slice(savedStart, savedEnd);

  const [recipeCount, setRecipeCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      const userId = getUserId();
      if (!userId) return;

      try {
        const recipeResult = await axios.get(
          `api/users/${userId}/recipe-count`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const likeResult = await axios.get(`api/users/${userId}/like-count`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { recipeCount } = recipeResult.data;
        const { likeCount } = likeResult.data;

        setRecipeCount(recipeCount);
        setLikeCount(likeCount);
      } catch (err) {
        if (err.response) {
          alert(err.response.data.error);
        }
      }
    };
    getCount();
  }, []);

  const [submittedRecipes, setSubmittedRecipes] = useState([]);

  useEffect(() => {
    const getSubmittedRecipes = async () => {
      const userId = getUserId();
      if (!userId) return;

      try {
        const response = await axios.get(`api/users/${userId}/recipes`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSubmittedRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSubmittedRecipes();
  }, []);

  const submittedStart = (submittedPage - 1) * PAGE_SIZE;
  const submittedEnd = submittedStart + PAGE_SIZE;
  const pagedSubmitted = submittedRecipes.slice(submittedStart, submittedEnd);

  return (
    // console.log(Array.isArray(submittedRecipes), submittedRecipes),
    <div className={theme === "dark" ? "dark-mode" : ""}>
      <div className="recipe-box-page">
        <HeaderBar />
        <main className="recipe-box-page-main-content">
          <div className="recipe-box-page-header-panel">
            <img
              src={theme === "dark" ? iconImgDark : iconImgLight}
              alt="landing"
              className="recipe-box-image"
            />
            <div className="text-box">
              <h2 className="recipe-box-page-panel-title">RECIPE BOX</h2>
              <h6>
                <span className="bold">username:</span>
                <span className="reg"> {username}</span>
                <span style={{ marginLeft: "1rem" }}> </span>
                <span className="bold">sign up date:</span>
                <span className="reg">
                  {" "}
                  {user && user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "Loading..."}
                </span>
              </h6>
              <h6>
                <div className="micro-desc">
                  <img
                    src={theme === "dark" ? tinylikeddark : tinylikedlight}
                    alt="likes"
                    className="likes"
                  />
                  <p className="micro-bold">Recipes Liked: </p>
                  <p className="micro-reg">{likeCount}</p>
                  <p className="micro-div"> | </p>
                  <img
                    src={theme === "dark" ? tinysaveddark : tinysavedlight}
                    alt="saves"
                    className="saves"
                  />
                </div>
              </h6>
              <h6>
                <span className="bold">subheading2:</span>
                <span className="reg"> subheading contents2</span>
                <span className="bold">subheading2:</span>
                <span className="reg"> subheading contents2</span>
              </h6>
            </div>
          </div>
          <div className="recipe-box-page-submitted-panel">
            <div className="recipe-box-page-submitted-panel-heading">
              <h3 className="recipe-box-page-submitted-title">
                submitted recipes
              </h3>
              <h6>
                <span className="bold">Modify submitted recipes: </span>
                <span className="reg"> (toggle edit field for recipe)</span>
              </h6>
              <h6>
                <span className="bold">submit a recipe: </span>
                <span className="reg">
                  <Link
                    to="/submit-recipe"
                    className="home-page-left-panel-advanced-search-bold"
                  >
                    Submit your recipe
                  </Link>
                </span>
              </h6>
            </div>
            <div className="recipe-box-page-submitted-panel-cards">
              <button
                disabled={submittedPage === 1}
                onClick={() => setSubmittedPage(submittedPage - 1)}
              >
                {submittedPage !== 1 ? (
                  <ArrowLeft
                    color="var(--text-color)"
                    strokeWidth={1.5}
                    size={20}
                  />
                ) : null}
              </button>

              {pagedSubmitted.length > 0 ? (
                pagedSubmitted.map((recipe, idx) => (
                  <RecipeBlock
                    key={recipe.recipeId || idx}
                    recipe={recipe}
                    type="submitted"
                  />
                ))
              ) : (
                <p>No recipes submitted yet.</p>
              )}

              <button
                disabled={submittedEnd >= submittedRecipes.length}
                onClick={() => setSubmittedPage(submittedPage + 1)}
              >
                {submittedEnd < submittedRecipes.length ? (
                  <ArrowRight
                    color="var(--text-color)"
                    strokeWidth={1.5}
                    size={20}
                  />
                ) : null}
              </button>
            </div>
          </div>
          <div className="recipe-box-page-saved-panel">
            <div className="recipe-box-page-saved-panel-heading">
              <h3 className="recipe-box-page-saved-title">saved recipes</h3>
              <h6>
                <span className="bold">Modify Likes:</span>
                <span className="reg">
                  {" "}
                  (toggle x button over card to remove from saved)
                </span>
              </h6>
            </div>
            <div className="recipe-box-page-saved-panel-cards">
              <button
                disabled={savedPage === 1}
                onClick={() => setSavedPage(savedPage - 1)}
              >
                {savedPage !== 1 ? (
                  <ArrowLeft
                    color="var(--text-color)"
                    strokeWidth={1.5}
                    size={20}
                  />
                ) : null}
              </button>
              {pagedsaved.map((recipe, idx) => (
                <RecipeBlock key={idx} recipe={recipe} type="saved" />
              ))}
              <button
                disabled={savedEnd >= savedRecipes.length}
                onClick={() => setSavedPage(savedPage + 1)}
              >
                {savedEnd < savedRecipes.length ? (
                  <ArrowRight
                    color="var(--text-color)"
                    strokeWidth={1.5}
                    size={20}
                  />
                ) : null}
              </button>
            </div>
          </div>
        </main>
        <footer className="recipe-box-page-footer">
          <p>Footer Content</p>
        </footer>
      </div>
    </div>
  );
}

export default RecipeBoxPage;
