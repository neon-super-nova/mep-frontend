import "../page-css/user-page.css";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/theme-context";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import Avatar from "../components/ui-basic-reusables/icons/avatar.jsx";

import tinylikedlight from "../components/img/icons/icon-likes-small-light.png";
import tinysavedlight from "../components/img/icons/icon-saves-small-light.png";
import tinylikeddark from "../components/img/icons/icon-likes-small-dark.png";
import tinysaveddark from "../components/img/icons/icon-saves-small-dark.png";
import axios from "axios";
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
import XFlag from "../components/ui-basic-reusables/labels/x-flag";
import ModalDeleteAcct from "../components/ui-basic-reusables/modals/modal-delete-acct.jsx";
import RecipeCardRow from "../components/ui-basic-reusables/blocks/RecipeCardRow.jsx";

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
  const [showPencils2, setShowPencils2] = useState(false);
  const [showFlag, setShowFlag] = useState(false);
  const [modalOpen, setModalOpen] = useState(null);
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

  // eslint-disable-next-line no-unused-vars
  const [_, setGlobalLikeCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      try {
        const recipeResult = await axios.get(
          `api/users/${userId}/recipe-count`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
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
          },
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
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/users/user-info/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const responseUserInfo = response.data?.userInfo ?? null;
        if (!responseUserInfo || typeof responseUserInfo !== "object") {
          return;
        }

        setUserInfo(responseUserInfo);
        setEditFields({
          favoriteCuisine: responseUserInfo?.favoriteCuisine || "",
          favoriteMeal: responseUserInfo?.favoriteMeal || "",
          favoriteDish: responseUserInfo?.favoriteDish || "",
          dietaryRestriction: (responseUserInfo?.dietaryRestriction || []).join(
            ", ",
          ),
        });
      } catch (err) {
        console.error("Error fetching user preferences:", err);
      }
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
        const fresh = await axios.get(`/api/users/user-info/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const freshUserInfo = fresh.data?.userInfo;
        if (!freshUserInfo || typeof freshUserInfo !== "object") {
          setEditingField(null);
          return;
        }

        setUserInfo(freshUserInfo);
        setEditFields({
          favoriteCuisine: freshUserInfo.favoriteCuisine || "",
          favoriteMeal: freshUserInfo.favoriteMeal || "",
          favoriteDish: freshUserInfo.favoriteDish || "",
          dietaryRestriction: (freshUserInfo.dietaryRestriction || []).join(
            ", ",
          ),
        });

        setEditingField(null);
      }
    } catch (err) {
      console.error("Error updating user info:", err);
      navigate("/");
    }
  };

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
          },
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
              <div className="profile-top-panel-container-total">
                <h2 className="profile-page-panel-title">Profile Details</h2>
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
                            <span className="avatar-upload-btn">
                              Change Avatar
                            </span>
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
                      <div className="profile-top-panel-info-entries">
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
                                  },
                                )
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
                                  {Array.isArray(
                                    userInfo?.dietaryRestriction,
                                  ) && userInfo.dietaryRestriction.length > 0
                                    ? userInfo.dietaryRestriction.map(
                                        (item, i) => (
                                          <li
                                            key={i}
                                            className="dietary-list-item"
                                          >
                                            {item}
                                          </li>
                                        ),
                                      )
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
                          style={{}}
                          onClick={() => setShowPencils1((v) => !v)}
                        >
                          {showPencils1 ? "Hide" : "Edit"}
                        </h5>
                        <div className="desc-row">
                          <p className="desc-bold">User Recipes:</p>
                        </div>
                        <div className="spacer-small" />
                        <div className="micro-desc">
                          <img
                            src={
                              theme === "dark" ? tinylikeddark : tinylikedlight
                            }
                            alt="likes"
                            className="likes"
                          />
                          <p className="micro-bold">Recipes Liked: </p>
                          <p className="micro-reg">{likeCount}</p>
                          <p className="micro-div"> | </p>
                          <img
                            src={
                              theme === "dark" ? tinysaveddark : tinysavedlight
                            }
                            alt="saves"
                            className="saves"
                          />
                          <p className="micro-bold">Recipes Submitted: </p>
                          <p className="micro-reg">{recipeCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen("modal-report")}
                  aria-label="Delete User Account"
                  className="account-delete-button"
                >
                  Delete User Account
                </button>
                <ModalDeleteAcct
                  open={modalOpen === "modal-report"}
                  onClose={() => setModalOpen(null)}
                />
              </div>
            </div>

            <div className="profile-top-panel-container-right">
              <h2 className="profile-page-panel-title">Recipe Box</h2>
              <div className="profile-top-panel-container-total">
                <div className="recipe-box-panels">
                  <div className="total-submitted-recipes">
                    <div className="user-page-submitted-panel-heading">
                      <h3 className="user-page-submitted-title">
                        submitted recipes
                      </h3>
                      <h6>
                        <span className="bold">Modify submitted recipes: </span>
                        <span className="home-page-left-panel-advanced-search-bold">
                          <span
                            className="user-page-toggle-link"
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
                    <RecipeCardRow
                      recipes={submittedRecipes}
                      renderCard={(recipe) => (
                        <RecipeBlockSubmit recipe={recipe} type="submitted" />
                      )}
                      renderOverlay={(recipe) =>
                        showPencils2 && (
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
                        )
                      }
                      emptyMessage="No recipes submitted yet."
                    />
                  </div>
                  <div className="user-page-liked-panel2">
                    <div className="user-page-liked-panel-heading">
                      <h3 className="user-page-liked-title">liked recipes</h3>
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
                    <RecipeCardRow
                      recipes={likedRecipes}
                      renderCard={(recipe) => (
                        <RecipeBlock recipe={recipe} type="liked" />
                      )}
                      renderOverlay={(recipe) =>
                        showFlag && (
                          <XFlag
                            clear={() =>
                              handleLikeRecipe(
                                recipe,
                                true,
                                likedRecipes,
                                setLikedRecipes,
                              )
                            }
                            show={showFlag}
                            className="user-page-liked-remove-icon"
                          />
                        )
                      }
                      emptyMessage="No liked recipes yet."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className="home-page-footer">
          <p className="footer-p">Questions or Feedback? Contact us at</p>
          <a
            href="mailto:mep.misenplate@gmail.com?subject=Recipe App Feedback"
            className="footer-a"
          >
            mep.misenplate@gmail.com
          </a>
        </footer>
      </div>
    </div>
  );
}

export default UserPage;
