import "../page-css/user-page.css";

import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/theme-context";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import Avatar from "../components/ui-basic-reusables/icons/avatar.jsx";
// import ToggleButton from "../components/ui-basic-reusables/buttons/button-toggle.jsx";
// import ButtonRadioGroup from "../components/ui-basic-reusables/buttons/button-radio-group.jsx";
import tinylikedlight from "../components/img/icons/icon-likes-small-light.png";
import tinysavedlight from "../components/img/icons/icon-saves-small-light.png";
import tinylikeddark from "../components/img/icons/icon-likes-small-dark.png";
import tinysaveddark from "../components/img/icons/icon-saves-small-dark.png";
import tinysubmitlight from "../components/img/icons/icon-submit-small-light.png";
import tinysubmitdark from "../components/img/icons/icon-submit-small-dark.png";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Pencil } from "lucide-react";
import { getUserId } from "../context/decodeToken.js";
import {
  deleteUserAvatar,
  getUserAvatar,
  saveUserAvatar,
} from "../context/tokens.js";
import handleLikeRecipe from "../components/ui-basic-reusables/util/handleLikeRecipe";
import RecipeBlock from "../components/ui-basic-reusables/blocks/recipe-block";
import RecipeBlockSubmit from "../components/ui-basic-reusables/blocks/recipe-block-submit";
import iconImgDark from "../components/img/recipe-box/recipesDark.png";
import iconImgLight from "../components/img/recipe-box/recipesLight.png";
import XFlag from "../components/ui-basic-reusables/labels/x-flag";
import { useBreakpoints } from "../context/breakpoints";

function UserPage() {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [avatarRefresh, setAvatarRefresh] = useState(0);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [editingField, setEditingField] = useState(null);
  const [editFields, setEditFields] = useState({
    favoriteCuisine: "",
    favoriteMeal: "",
    favoriteDish: "",
    dietaryRestriction: [],
  });

  const [showPencils1, setShowPencils1] = useState(false);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState("");
  const [submittedPage, setSubmittedPage] = useState(1);
  const [likedPage, setLikedPage] = useState(1);
  const [showPencils2, setShowPencils2] = useState(false);
  const [showFlag, setShowFlag] = useState(false);
  const userId = getUserId();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`api/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(response.data.userInfo);
        const { username, firstName, lastName } = response.data.userInfo;
        setUsername(username);
        setFullname(`${firstName} ${lastName}`);
      } catch (err) {}
    };
    if (userId) {
      getUser();
    }
  }, [userId]);

  // Avatar upload handler
  const handleAvatarUpload = async (file) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("image", file);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const upload = await axios.post("/api/users/image", formData, {
        headers,
      });
      if (getUserAvatar() !== upload.data.pictureUrl) {
        deleteUserAvatar();
        saveUserAvatar(upload.data.pictureUrl);
      }
      setAvatarRefresh((v) => v + 1);
    } catch (err) {
      alert(err.response.error || "Failed to upload avatar.");
    }
  };

  const [globalLikeCount, setGlobalLikeCount] = useState(0);

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
        const likeResult = await axios.get(`api/users/${userId}/like-count`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const globalLikeResult = await axios.get(
          `api/users/${userId}/global-like-count`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { recipeCount } = recipeResult.data;
        const { likeCount } = likeResult.data;
        const { globalLikeCount } = globalLikeResult.data;

        setGlobalLikeCount(globalLikeCount);
        setRecipeCount(recipeCount);
        setLikeCount(likeCount);
      } catch (err) {}
    };
    if (userId) {
      getCount();
    }
  }, [userId]);

  // fetching user-info collection

  const [userInfo, setUserInfo] = useState({
    favoriteCuisine: "",
    favoriteMeal: "",
    favoriteDish: "",
    dietaryRestriction: [],
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`api/users/user-info/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseUserInfo = response.data.userInfo;

        setUserInfo(responseUserInfo);
        setEditFields({
          favoriteCuisine: responseUserInfo?.favoriteCuisine || "",
          favoriteMeal: responseUserInfo?.favoriteMeal || "",
          favoriteDish: responseUserInfo?.favoriteDish || "",
          dietaryRestriction: (responseUserInfo?.dietaryRestriction || []).join(
            ", "
          ),
        });
      } catch (err) {}
    };
    if (userId) {
      getUserInfo();
    }
  }, [userId]);

  const displayOrPlaceholder = (val) =>
    val && (Array.isArray(val) ? val.length > 0 : val !== "")
      ? Array.isArray(val)
        ? val.join(", ")
        : val
      : "Not filled out";

  const handleFieldEdit = async (e, field) => {
    e.preventDefault();
    if (!userId) return;

    const value = editFields[field];
    if (!value || value === "Not filled out") {
      setEditingField(null);
      return;
    }

    const isArrayField = (f) => f === "dietaryRestriction";
    let fieldValue;

    if (isArrayField(field)) {
      fieldValue = value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      fieldValue = value;
    }

    if (!isArrayField(field) && !fieldValue) {
      setEditingField(null);
      return;
    }

    const patchBody = { [field]: fieldValue };

    const token = localStorage.getItem("token");
    if (!token) return;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios({
        method: "patch",
        url: "/api/users/user-info",
        headers,
        data: patchBody,
      });

      if (response.data?.message === "Success") {
        const fresh = await axios.get(`api/users/user-info/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setUserInfo(fresh.data.userInfo);
        setEditFields({
          favoriteCuisine: fresh.data.userInfo.favoriteCuisine || "",
          favoriteMeal: fresh.data.userInfo.favoriteMeal || "",
          favoriteDish: fresh.data.userInfo.favoriteDish || "",
          dietaryRestriction: (
            fresh.data.userInfo.dietaryRestriction || []
          ).join(", "),
        });

        setEditingField(null);
      }
    } catch (err) {
      console.error("Error updating user info:", err);
      navigate("/");
    }
  };

  const db_recipe_saved = "000000";
  const user_recipe_saved = "000000";

  // const notificationChoices = [
  //   {
  //     value: "email-updates",
  //     label:
  //       "Update me through email when someone likes or comments on my recipes",
  //   },
  //   {
  //     value: "text-message-updates",
  //     label:
  //       "Update me through text when someone likes or comments on my recipes",
  //   },
  //   {
  //     value: "both",
  //     label:
  //       "Update me through both email and text when someone likes or comments on my recipes",
  //   },
  //   { value: "none", label: "Do none of the above" },
  // ];

  // change with backend logic when applicable

  // const [notificationChoice, setNotificationChoice] = useState(
  //   notificationChoices[0].value
  // );

  // const [emailOpen, setEmailOpen] = useState(
  //   localStorage.getItem("emailOpen") === "true"
  // );

  // const [newsletterOpen, setNewsletterOpen] = useState(
  //   localStorage.getItem("newsletterOpen") === "true"
  // );

  // useEffect(() => {
  //   const storedNotificationChoice = localStorage.getItem("notificationChoice");
  //   if (storedNotificationChoice)
  //     setNotificationChoice(storedNotificationChoice);

  //   const storedEmailOpen = localStorage.getItem("emailOpen");
  //   if (storedEmailOpen !== null) setEmailOpen(storedEmailOpen === "true");

  //   const storedNewsletterOpen = localStorage.getItem("newsletterOpen");
  //   if (storedNewsletterOpen !== null)
  //     setNewsletterOpen(storedNewsletterOpen === "true");
  // }, []);

  // const handleNotificationChange = (choice) => {
  //   setNotificationChoice(choice);
  //   localStorage.setItem("notificationChoice", choice);
  // };

  // const handleEmailOpenChange = (open) => {
  //   setEmailOpen(open);
  //   localStorage.setItem("emailOpen", open);
  // };

  // const handleNewsletterOpenChange = (open) => {
  //   setNewsletterOpen(open);
  //   localStorage.setItem("newsletterOpen", open);
  // };

  const { isMobile, isTablet, isMedium, isLarge} = useBreakpoints();

  const PAGE_SIZE = useMemo(() => {
    if (isMobile) return 3;
    if (isTablet) return 4;
    if (isMedium || isLarge) return 5;
    return 6; 
  }, [isMobile, isTablet, isMedium, isLarge]);

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
  }, [userId]);

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

  return (
    <div className={theme === "dark" ? "dark-mode" : ""}>
      <div className="profile-page">
        <HeaderBar />
        <header>
          <h1 className="profile-page-panel-title">USER PROFILE</h1>
        </header>
        <main className="profile-page-main-content">
          <div className="profile-top-panel">
            <div className="profile-top-panel-container-left">
              <h2 className="profile-page-panel-title">User Profile</h2>
              <div className="profile-top-panel left">
                <div className="box1">
                <div className="profile-top-panel avatar">
                  <Avatar
                    className="profile-image"
                    refreshTrigger={avatarRefresh}
                  />
                  {showPencils1 && (
                    <form className="avatar-upload-form">
                      <label
                        htmlFor="avatar-upload"
                        className="avatar-upload-label"
                      >
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="avatar-upload-input"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleAvatarUpload(e.target.files[0]);
                              setSelectedAvatarFile(e.target.files[0].name);
                              e.target.value = "";
                            } else {
                              setSelectedAvatarFile("");
                            }
                          }}
                        />
                        <span className="avatar-upload-btn">Change Avatar</span>
                        {selectedAvatarFile && (
                          <div className="avatar-upload-filename">
                            {selectedAvatarFile}
                          </div>
                        )}
                      </label>
                    </form>
                  )}
                </div>
                <div className="profile-top-panel info">
                  <div className="desc-row">
                    <p className="desc-bold">Username:</p>
                    <p className="desc-reg">{username}</p>
                  </div>
                  <div className="spacer-small" />
                  <div className="desc-row"></div>
                  <div className="desc-row">
                    <p className="desc-bold">Full Name:</p>
                    <p className="desc-reg name">{fullname}</p>
                  </div>
                  <div className="desc-row">
                    <p className="desc-bold">Signup Date:</p>
                    <p className="desc-reg">
                      {user && user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                          })
                        : "Loading..."}
                    </p>
                  </div>
                  <div className="spacer-medium" />
                  <div className="personal-preferences-row">
                    <h4 className="personal-preferences-title">
                      Personal Preferences
                    </h4>
                  </div>
                  <div className="spacer-medium" />
                  {[
                    "favoriteCuisine",
                    "favoriteMeal",
                    "favoriteDish",
                    "dietaryRestriction",
                  ].map((field) => (
                    <div
                      className={
                        "desc-row" +
                        (field === "dietaryRestriction"
                          ? " dietary-desc-row"
                          : "")
                      }
                      key={field}
                    >
                      <span className="desc-bold">
                        {field === "favoriteCuisine" &&
                          "Favorite Global Cuisine:"}
                        {field === "favoriteMeal" && "Favorite Meal:"}
                        {field === "favoriteDish" && "Favorite Dish:"}
                        {field === "dietaryRestriction" &&
                          "Dietary Restriction:"}
                      </span>
                      {showPencils1 && editingField === field ? (
                        <form
                          onSubmit={(e) => handleFieldEdit(e, field)}
                          className="edit-user-info-form"
                        >
                          {field === "dietaryRestriction" ? (
                            <textarea
                              className="desc-reg"
                              value={editFields[field]}
                              onChange={(e) =>
                                setEditFields((f) => ({
                                  ...f,
                                  [field]: e.target.value,
                                }))
                              }
                              rows={4}
                              style={{ resize: "vertical" }}
                            />
                          ) : (
                            <input
                              className="desc-reg"
                              type="text"
                              value={editFields[field]}
                              onChange={(e) =>
                                setEditFields((f) => ({
                                  ...f,
                                  [field]: e.target.value,
                                }))
                              }
                            />
                          )}
                          <div className="user-button-container">
                            <button
                              type="submit"
                              className="edit-user-info-save"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="edit-user-info-cancel"
                              onClick={() => setEditingField(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : field === "dietaryRestriction" ? (
                        <>
                          <ul className="dietary-list">
                            {Array.isArray(userInfo?.dietaryRestriction) &&
                            userInfo.dietaryRestriction.length > 0
                              ? userInfo.dietaryRestriction.map((item, i) => (
                                  <li key={i} className="dietary-list-item">
                                    {item}
                                  </li>
                                ))
                              : null}
                          </ul>
                          {showPencils1 && (
                            <Pencil
                              className="edit-pencil-icon"
                              color="var(--main-accent-color-alt)"
                              fill="var(--main-accent-color)"
                              strokeWidth={1.5}
                              size={14}
                              title="Edit"
                              onClick={() => setEditingField(field)}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          <span className="desc-reg">
                            {displayOrPlaceholder(userInfo?.[field])}
                          </span>
                          {showPencils1 && (
                            <Pencil
                              className="edit-pencil-icon"
                              color="var(--main-accent-color-alt)"
                              fill="var(--main-accent-color)"
                              strokeWidth={1.5}
                              size={14}
                              title="Edit"
                              onClick={() => setEditingField(field)}
                            />
                          )}
                        </>
                      )}
                    </div>
                  ))}
                  <div className="spacer-medium" />
                  <h5
                    className="edit-toggle-link"
                    style={{ cursor: "pointer", textAlign: "right", margin: 0 }}
                    onClick={() => setShowPencils1((v) => !v)}
                  >
                    {showPencils1 ? "Hide" : "Edit"}
                  </h5>
                  </div>
                </div>
                <div className="box2">
                <div className="profile-top-panel info">
                  <div className="desc-row">
                    <p className="desc-bold">User Recipes:</p>
                  </div>
                  <div className="spacer-small" />
                  <div className="micro-desc">
                    <img
                      src={theme === "dark" ? tinysubmitdark : tinysubmitlight}
                      alt="submit"
                      className="submit"
                    />
                    <p className="micro-bold">Submitted: </p>
                    <p className="micro-reg">{recipeCount}</p>
                  </div>
                  <div className="micro-desc">
                    <img
                      src={theme === "dark" ? tinylikeddark : tinylikedlight}
                      alt="likes"
                      className="likes"
                    />
                    <p className="micro-bold">Global Likes: </p>
                    <p className="micro-reg">{globalLikeCount}</p>
                    <p className="micro-div"> | </p>
                    <img
                      src={theme === "dark" ? tinysaveddark : tinysavedlight}
                      alt="saves"
                      className="saves"
                    />
                    <p className="micro-bold">Global Saves: </p>
                    <p className="micro-reg">{db_recipe_saved}</p>
                  </div>
                  <div className="spacer-medium" />
                  <div className="desc-row">
                    <p className="desc-bold">Recipe Box:</p>
                  </div>
                  <div className="spacer-small" />
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
                    <p className="micro-bold">Recipe Saved: </p>
                    <p className="micro-reg">{user_recipe_saved}</p>
                  </div>
                </div>
                </div>
           
              </div>
                   <button
                // onClick={ }
                // will fill in with delete function later
                aria-label="Delete User Account"
                className="account-delete-button"
              >
                Delete User Account
              </button>
            </div>

            <div className="profile-top-panel-container-right">
            <h2 className="profile-page-panel-title">Recipe Box</h2>
              <div className="profile-top-panel rb2">
                <div className="profile-top-panel rb">
                  <img
                    src={theme === "dark" ? iconImgDark : iconImgLight}
                    alt="landing"
                    className="recipe-box-image"
                  />
                  <div className="profile-top-panel info-new">
                    <div className="desc-row">
                      <p className="desc-bold">Username:</p>
                      <p className="desc-reg">{username}</p>
                    </div>
                    <div className="spacer-small" />
                    <div className="desc-row"></div>
                    <div className="desc-row">
                      <p className="desc-bold">Full Name:</p>
                      <p className="desc-reg name">{fullname}</p>
                    </div>
                    <div className="desc-row">
                      <p className="desc-bold">Signup Date:</p>
                      <p className="desc-reg">
                        {user && user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              }
                            )
                          : "Loading..."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-top-panel right">
                <div className="recipe-box-page-submitted-panel2">
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
                          onClick={() => setShowPencils2((v) => !v)}
                        >
                          {showPencils2
                            ? "Go Back"
                            : "Edit a recipe you submitted"}
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
                          Enter your recipe here.
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
                          {showPencils2 && (
                            <Link
                              to={`/modify-recipe/${
                                recipe._id || recipe.recipeId
                              }`}
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
                      <p className="recipe-box-page-no-recipes-found">
                        No recipes submitted yet.
                      </p>
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
                <div className="recipe-box-page-liked-panel2">
                  <div className="recipe-box-page-liked-panel-heading">
                    <h3 className="recipe-box-page-liked-title">
                      liked recipes
                    </h3>
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
                          {showFlag ? "Go Back" : "Unlike a recipe you liked"}
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
                        <div
                          key={idx}
                          className="recipe-box-page-liked-flag-wrapper"
                        >
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
            </div>
          </div>
{/* 
          <div className="profile-bottom-panel">
            <h3 className="profile-page-panel-title">ACCOUNT SETTINGS</h3>
            <p className="profile-page-panel-desc">
              "Delete Account" - link to go to page or modal
            </p>
          </div> */}
        </main>
        <footer className="profile-page-footer">
          <p>Footer Content</p>
        </footer>
      </div>
    </div>
  );
}

export default UserPage;
