import "../page-css/recipe-page.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/theme-context";
import { getUserId } from "../context/decodeToken.js";
import NewStarRating from "../components/ui-basic-reusables/icons/new-star-rating";
import RecipeTags from "../components/ui-basic-reusables/labels/label-tag-food";
import tinylikedlight from "../components/img/icons/icon-likes-small-light.png";
import tinylikeddark from "../components/img/icons/icon-likes-small-dark.png";
import tinylikedlight25 from "../components/img/icons/icon-likes-small-light-25.png";
import tinylikeddark25 from "../components/img/icons/icon-likes-small-dark-25.png";
//import biglikedlight from "../components/img/icons/icon-likes-large-light.png";
//import biglikeddark from "../components/img/icons/icon-likes-large-dark.png";
import lightcutlery from "../components/img/icons/icon-cutlery-light.png";
import lighttimer from "../components/img/icons/icon-timer-light.png";
import lightmeasure from "../components/img/icons/icon-measure-light.png";
import darkcutlery from "../components/img/icons/icon-cutlery-dark.png";
import darktimer from "../components/img/icons/icon-timer-dark.png";
import darkmeasure from "../components/img/icons/icon-measure-dark.png";
import axios from "axios";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import dummyV1 from "../components/img/dummy/placeholder_1.jpg";
// import dummyReviews from "../context/recipeReview.json";
import avatarLight from "../components/img/user/default-user-light_web.png";
import avatarDark from "../components/img/user/default-user-dark_web.png";
import RecipeBlock from "../components/ui-basic-reusables/blocks/review-block.jsx";

function RecipePage() {
  const { recipeId } = useParams();
  const { theme } = useTheme();
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const userId = getUserId();
  const [recipeStats, setRecipeStats] = useState({
    averageReview: 0,
    reviewCount: 0,
    likeCount: 0,
  });

  const [likedRecipes, setLikedRecipes] = useState([]);
  const likedStatus = likedRecipes.some((r) => r._id === recipe._id);
  const [toastMsg, setToastMsg] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`/api/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(response.data.userInfo);
      } catch (err) {
        if (err.response) {
          alert(err.response.data.error);
        }
      }
    };
    getUser();
  }, [userId]);

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

  useEffect(() => {
    const getLikedRecipes = async () => {
      if (!userId) return;
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
    getLikedRecipes();
  }, [userId]);

  const handleLikeRecipe = async () => {
    if (!recipe) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (likedStatus === false) {
      try {
        const response = await axios.post(
          `/api/recipes/${recipeId}/like`,
          {},
          { headers }
        );
        console.log(response.data);
        setLikedRecipes([...likedRecipes, recipe]);
      } catch (err) {
        console.error("Error liking recipe:", err);
      }
    } else {
      try {
        const response = await axios.post(`/api/recipes/${recipeId}/unlike`);
        console.log(response.data);
        setLikedRecipes(likedRecipes.filter((r) => r._id !== recipe._id));
      } catch (err) {
        console.error("Error unliking recipe:", err);
      }
    }
  };

  useEffect(() => {
    const getRecipeReviews = async () => {
      try {
        const response = await axios.get(`/api/recipes/${recipeId}/reviews`);
        setReviews(response.data);
      } catch (err) {
            if (err.response && err.response.status === 404) {
              setReviews([]);
            } else {
              setReviews([]);
              console.error(err);
            }
      }
    };
    getRecipeReviews();
  }, [recipeId]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2000);
  };
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
              <span style={{ width: "1.75rem" }}></span>
              <h6>
                <span className="bold">Liked? </span>
                <span style={{ width: "0.5rem" }}></span>
                <span className="reg">
                  <button
                    className="like-btn"
                    onClick={() => {
                      handleLikeRecipe();
                      showToast(
                        likedStatus ? "Recipe unliked!" : "Recipe liked!"
                      );
                    }}
                    style={{ background: "none", border: "none", padding: 0 }}
                  >
                    <img
                      src={
                        likedStatus
                          ? theme === "dark"
                            ? tinylikeddark
                            : tinylikedlight
                          : theme === "dark"
                          ? tinylikeddark25
                          : tinylikedlight25
                      }
                      alt="Like icon and button"
                      className="recipe-page-like-icon"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          theme === "dark" ? avatarDark : avatarLight;
                      }}
                    />
                  </button>
                  {toastMsg && <div className="toast">{toastMsg}</div>}
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
                  {recipeStats.averageReview ? (
                    <>
                      <span className="star">
                        <NewStarRating
                          rating={recipeStats.averageReview}
                        ></NewStarRating>
                      </span>
                      <span className="rate">
                        {" "}
                        {recipeStats.averageReview} / 5 stars
                      </span>
                    </>
                  ) : (
                    <span className="no-rating">(Recipe not yet rated)</span>
                  )}
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
                <p>
                  {recipe.authorNotes.map((note, index) => (
                    <span className="author-notes-true" key={index}>
                      {note}
                    </span>
                  ))}
                </p>
              ) : (
                <p className="author-notes-false">Enjoy!</p>
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
              <h4 id="reviews">REVIEWS:</h4>
              {recipeStats.reviewCount && reviews.length > 0 ? (
                <div className="reviews-true">
                  {reviews.map((review) => (
                    <RecipeBlock
                      key={review.createdAt}
                      createdAt={review.createdAt}
                      pictureUrl={review.pictureUrl}
                      username={review.username}
                      rating={review.rating}
                      comment={review.comment}
                    />
                  ))}
                </div>
              ) : (
                <p className="reviews-false">
                  (This recipe has not yet been reviewed by other Mise en Plate
                  users...)
                </p>
              )}
              {/* will create the hash map for later (need to import other database) */}
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
