/* eslint-disable react-hooks/exhaustive-deps */
import "../page-css/recipe-box-page.css";
import { useTheme } from "../context/theme-context";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import handleLikeRecipe from "../components/ui-basic-reusables/util/handleLikeRecipe";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import RecipeBlock from "../components/ui-basic-reusables/blocks/recipe-block";
import RecipeBlockSubmit from "../components/ui-basic-reusables/blocks/recipe-block-submit";
import { ArrowLeft, ArrowRight } from "lucide-react";
import iconImgDark from "../components/img/recipe-box/recipesDark.png";
import iconImgLight from "../components/img/recipe-box/recipesLight.png";
import { getUserId } from "../context/decodeToken.js";
import tinylikedlight from "../components/img/icons/icon-likes-small-light.png";
import tinysavedlight from "../components/img/icons/icon-saves-small-light.png";
import tinylikeddark from "../components/img/icons/icon-likes-small-dark.png";
import tinysaveddark from "../components/img/icons/icon-saves-small-dark.png";
import { Pencil } from "lucide-react";
import XFlag from "../components/ui-basic-reusables/labels/x-flag";
// import tinysubmitlight from "../components/img/icons/icon-submit-small-light.png";
// import tinysubmitdark from "../components/img/icons/icon-submit-small-dark.png";

function RecipeBoxPage() {
  const { theme } = useTheme();
  const [submittedPage, setSubmittedPage] = useState(1);
  const [likedPage, setLikedPage] = useState(1);
  const [showPencils, setShowPencils] = useState(false);
  const [showFlag, setShowFlag] = useState(false);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  const userId = getUserId();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`, {
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
    if (userId) {
      getUser();
    }
  }, [userId]);

  const PAGE_SIZE = 7;

  const [recipeCount, setRecipeCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      try {
        const recipeResult = await axios.get(
          `api/users/${userId}/recipe-count`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const likeResult = await axios.get(`/api/users/${userId}/like-count`, {
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
    if (userId) {
      getCount();
    }
  }, [userId]);

  const [submittedRecipes, setSubmittedRecipes] = useState([]);
  const submittedStart = (submittedPage - 1) * PAGE_SIZE;
  const submittedEnd = submittedStart + PAGE_SIZE;
  const pagedSubmitted = submittedRecipes.slice(submittedStart, submittedEnd);

  useEffect(() => {
    const getSubmittedRecipes = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`/api/users/${userId}/recipes`, {
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

  const [likedRecipes, setLikedRecipes] = useState([]);
  // const likedRecipes = dummyliked || [];
  const likedStart = (likedPage - 1) * PAGE_SIZE;
  const likedEnd = likedStart + PAGE_SIZE;
  const pagedliked = likedRecipes.slice(likedStart, likedEnd);

  useEffect(() => {
    const getLikedRecipes = async () => {
      try {
        const result = await axios.get(`/api/users/${userId}/liked-recipes`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setLikedRecipes(result.data.likedRecipes);
      } catch (err) {
        console.log(err);
      }
    };
    if (userId) {
      getLikedRecipes();
    }
  }, [userId]);

  // const [showPencils, setShowPencils] = useState(false);

  // const [toastMsg, setToastMsg] = useState("");
  // const showToast = (msg) => {
  //   setToastMsg(msg);
  //   setTimeout(() => setToastMsg(""), 2000);
  // };

  return (
    // console.log(Array.isArray(submittedRecipes), submittedRecipes),
    <div className={theme === "dark" ? "dark-mode" : ""}>
      <div className="recipe-box-page">
        <HeaderBar />
        <div className="recipe-box-page-main-content">
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
                  <p className="bold">Recipes Liked: </p>
                  <p className="reg">{likeCount}</p>
                  <span style={{ marginLeft: "0.25rem" }}> </span>
                  <p className="micro-div"> | </p>
                  <span style={{ marginRight: "0.125rem" }}> </span>
                  <img
                    src={theme === "dark" ? tinysaveddark : tinysavedlight}
                    alt="saves"
                    className="saves"
                  />
                  <p className="bold">Recipes submitted: </p>
                  <p className="reg">{recipeCount}</p>
                </div>
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
                <span className="home-page-left-panel-advanced-search-bold">
                  {" "}
                  <span
                    className="recipe-box-page-toggle-link"
                    onClick={() => setShowPencils((v) => !v)}
                  >
                    {showPencils
                      ? "Hide something something"
                      : "Edit something something"}
                  </span>
                </span>
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
                  <div
                    key={recipe.recipeId || idx}
                    style={{ position: "relative", zIndex: 1 }}
                  >
                    <RecipeBlockSubmit recipe={recipe} type="submitted" />
                    {showPencils && (
                      <Link
                        to={`/modify-recipe/${recipe._id || recipe.recipeId}`}
                        style={{ marginLeft: 8 }}
                      >
                        <Pencil
                          className="edit-pencil-icon"
                          color="var(--text-color)"
                          fill="var(--main-accent-color-alt)"
                          strokeWidth={1.75}
                          size={24}
                          title="Edit"
                        />
                      </Link>
                    )}
                  </div>
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
          <div className="recipe-box-page-liked-panel">
            <div className="recipe-box-page-liked-panel-heading">
              <h3 className="recipe-box-page-liked-title">liked recipes</h3>
              <h6>
                <span className="bold">Modify liked recipes: </span>
                <span className="home-page-left-panel-advanced-search-bold">
                  <span
                    className="rbp-toggle-link"
                    onClick={() => {
                      setShowFlag((v) => !v);
                      console.log("toggling showFlag", !showFlag);
                    }}
                  >
                    {showFlag
                      ? "Hide something something"
                      : "Unlike something something"}
                  </span>
                </span>
              </h6>
            </div>
            <div className="recipe-box-page-liked-panel-cards">
              <button
                disabled={likedPage === 1}
                onClick={() => setLikedPage(likedPage - 1)}
              >
                {likedPage !== 1 ? (
                  <ArrowLeft
                    color="var(--text-color)"
                    strokeWidth={1.5}
                    size={20}
                  />
                ) : null}
              </button>

              {pagedliked.map((recipe, idx) => {
                return (
                  <div key={idx} className="recipe-box-page-liked-flag-wrapper">
                    <RecipeBlock recipe={recipe} type="liked" />
                    {showFlag && (
                      <XFlag
                        clear={() =>
                          handleLikeRecipe(
                            recipe,
                            true,
                            likedRecipes,
                            setLikedRecipes
                          )
                        }
                        show={showFlag}
                        className="recipe-box-page-liked-remove-icon"
                      />
                    )}
                  </div>
                );
              })}
              <button
                disabled={likedEnd >= likedRecipes.length}
                onClick={() => setLikedPage(likedPage + 1)}
              >
                {likedEnd < likedRecipes.length ? (
                  <ArrowRight
                    color="var(--text-color)"
                    strokeWidth={1.5}
                    size={20}
                  />
                ) : null}
              </button>
            </div>
          </div>
        </div>
        <footer className="recipe-box-page-footer">
          <p>Footer Content</p>
        </footer>
      </div>
    </div>
  );
}

export default RecipeBoxPage;
