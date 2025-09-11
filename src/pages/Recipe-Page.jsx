import "../page-css/recipe-page.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "../context/theme-context";
import { getUserId } from "../context/decodeToken.js";
import NewStarRating from "../components/ui-basic-reusables/icons/new-star-rating";
import RecipeTags from "../components/ui-basic-reusables/labels/label-tag-food";
import handleLikeRecipe from "../components/ui-basic-reusables/util/handleLikeRecipe";
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
import RadioStarRating from "../components/ui-basic-reusables/buttons/buttons-radio-star.jsx";
// import { Pencil } from "lucide-react";

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

  // const [likedRecipes, setLikedRecipes] = useState([]);
  // const likedStatus = recipe
  //   ? likedRecipes.some((r) => r._id === recipe._id)
  //   : false;
  const [likedStatus, setLikedStatus] = useState();
  const [toastMsg, setToastMsg] = useState("");
  const [alreadyReviewed, setAlreadyReviewed] = useState();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getLikeStatus = async () => {
      if (!userId) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          `/api/recipes/${recipeId}/like-status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("upon refresh like status was " + response.data.status);
        setLikedStatus(response.data.status);
      } catch (err) {
        // setLikedStatus(false);
      }
    };
    getLikeStatus();
  });

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
  }, [recipeId, userId]);

  const getRecipeStats = useCallback(async () => {
    try {
      const response = await axios.get(`/api/recipes/${recipeId}/recipe-stats`);
      console.log(response.data);
      setRecipeStats({
        averageReview: response.data.averageReview || 0,
        reviewCount: response.data.reviewCount || 0,
        likeCount: response.data.likeCount || 0,
      });
    } catch (err) {
      console.error("Failed to fetch recipe stats", err);
    }
  }, [recipeId]);

  useEffect(() => {
    getRecipeStats();
  }, [getRecipeStats]);

  const getRecipeReviews = useCallback(async () => {
    try {
      const response = await axios.get(`/api/recipes/${recipeId}/reviews`);
      const reviewsArray = response.data.reviews || [];

      console.log("Frontend received reviews:", reviewsArray);

      setReviews(reviewsArray);
      setAlreadyReviewed(
        reviewsArray.some((r) => r.userId.toString() === userId)
      );
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviews([]);
    }
  }, [recipeId, userId]);

  useEffect(() => {
    getRecipeReviews();
  });

  const [formData, setFormData] = useState({
    ratingStr: "",
    comment: "",
  });
  const [comment, setComment] = useState("");

  const handleReview = async () => {
    const rating = Number(formData.ratingStr);
    const trimmedComment = comment.trim();

    if (!trimmedComment || rating < 1 || rating > 5 || isNaN(rating)) {
      alert("Cannot submit an empty or incomplete review.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      if (reviews.some((r) => r.userId === userId)) {
        alert("You have already reviewed this recipe.");
        return;
      }

      const reviewBody = { rating, comment: trimmedComment };
      const response = await axios.post(
        `/api/recipes/${recipeId}/review`,
        reviewBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.message || response.data?.success) {
        alert("Review submitted successfully!");
        setFormData({ ratingStr: "", comment: "" });
        setComment("");

        await getRecipeReviews();
        await getRecipeStats();
      } else {
        alert(response.data?.error || "Unexpected response. Please try again.");
      }
    } catch (err) {
      alert(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2000);
  };
  if (recipe === null) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  const units = recipe.units || "US/Imperial";

  if (recipe === null) return <p>Loading...</p>;

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
                      handleLikeRecipe(recipe, setLikedStatus);
                      showToast(
                        likedStatus ? "Recipe unliked!" : "Recipe liked!"
                      );
                      // need to get true or false from handleLikeRecipe()
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

              <h4 id="reviews" className="review-header">
                LEAVE A REVIEW:
              </h4>
              <span>
                {!alreadyReviewed ? (
                  <span className="reg review-first">
                    Be the first to leave a review!
                  </span>
                ) : (
                  <span className="reg review-reg">Leave a Review</span>
                )}
              </span>
              <div className="review-input">
                <h6 className="review-input-label">Rating (1-5): </h6>
                <RadioStarRating
                  value={Number(formData.ratingStr)}
                  onChange={(val) => {
                    setFormData({ ...formData, ratingStr: val });
                    console.log("Rating updated:", val);
                  }}
                />
                <h5 className="comment-label">Comment:</h5>
                <textarea
                  name="review-comment-input"
                  className="review-comment-input"
                  placeholder="Write your review here..."
                  rows={4}
                  maxLength={1000}
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    console.log("Comment updated:", e.target.value);
                  }}
                />
                <button
                  className="submit-review-button"
                  onClick={handleReview}
                  aria-label="Submit Review"
                >
                  Submit Review
                </button>
              </div>
              <h4 id="reviews">OTHER USER REVIEWS:</h4>
              {reviews.length > 0 ? (
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
