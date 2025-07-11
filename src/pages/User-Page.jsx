import "../page-css/user-page.css";
import { useState, useEffect } from "react";
import { useTheme } from "../context/theme-context";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import Avatar from "../components/ui-basic-reusables/icons/avatar.jsx";
import tinylikedlight from "../components/img/icons/icon-likes-small-light.png";
import tinysavedlight from "../components/img/icons/icon-saves-small-light.png";
import tinylikeddark from "../components/img/icons/icon-likes-small-dark.png";
import tinysaveddark from "../components/img/icons/icon-saves-small-dark.png";
import tinysubmitlight from "../components/img/icons/icon-submit-small-light.png";
import tinysubmitdark from "../components/img/icons/icon-submit-small-dark.png";
import axios from "axios";
import { getUserId } from "../context/decodeToken.js";
import { Pencil } from "lucide-react";
import {
  deleteUserAvatar,
  getUserAvatar,
  saveUserAvatar,
} from "../context/tokens.js";

function UserPage() {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [avatarRefresh, setAvatarRefresh] = useState(0);

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [editingField, setEditingField] = useState(null);
  const [editFields, setEditFields] = useState({
    favoriteCuisine: "",
    favoriteMeal: "",
    favoriteDish: "",
    dietaryRestriction: "",
  });

  const [showPencils, setShowPencils] = useState(false);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState("");

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
        const { username, firstName, lastName } = response.data.userInfo;
        setUsername(username);
        setFullname(`${firstName} ${lastName}`);
      } catch (err) {}
    };
    getUser();
  }, []);

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

  // fetching user recipe and like count
  const [recipeCount, setRecipeCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [globalLikeCount, setGlobalLikeCount] = useState(0);

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
    getCount();
  }, []);

  // fetching user-info collection

  const [userInfo, setUserInfo] = useState({
    favoriteCuisine: "",
    favoriteMeal: "",
    favoriteDish: "",
    dietaryRestriction: [],
  });

  useEffect(() => {
    const getUserInfo = async () => {
      const userId = getUserId();
      if (!userId) return;

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
    getUserInfo();
  }, []);

  const displayOrPlaceholder = (val) =>
    val && (Array.isArray(val) ? val.length > 0 : val !== "")
      ? Array.isArray(val)
        ? val.join(", ")
        : val
      : "Not filled out";

  const handleFieldEdit = async (e, field) => {
    e.preventDefault();
    const userId = getUserId();
    if (!userId) return;
    const value = editFields[field];
    if (!value || value === "Not filled out") {
      setEditingField(null);
      return;
    }
    const isArrayField = (f) => f === "dietaryRestriction";
    const patchBody = {
      [field]: isArrayField(field)
        ? value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : value,
    };
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    try {
      let response = "";
      if (
        (await axios.get(`api/users/user-info/${userId}`, { headers })) ===
        "Empty user info"
      ) {
        response = await axios.post(`/api/users/user-info/`, patchBody, {
          headers,
        });
      } else {
        response = await axios.patch(`/api/users/user-info/`, patchBody, {
          headers,
        });
      }
      let updated = response.data?.userInfo;
      if (!updated && response.data && typeof response.data === "object") {
        updated = response.data;
      }
      if (!updated || updated.message) {
        try {
          const userInfoResp = await axios.get(
            `api/users/user-info/${userId}`,
            { headers }
          );
          updated = userInfoResp.data.userInfo;
        } catch (fetchErr) {
          console.warn("Failed to fetch userInfo after PATCH/POST:", fetchErr);
        }
      }

      setUserInfo(updated);
      setEditFields({
        favoriteCuisine: updated?.favoriteCuisine || "",
        favoriteMeal: updated?.favoriteMeal || "",
        favoriteDish: updated?.favoriteDish || "",
        dietaryRestriction: (updated?.dietaryRestriction || []).join(", "),
      });
      setEditingField(null);
    } catch (err) {}
  };

  const db_recipe_saved = "000000";

  const user_recipe_saved = "000000";

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
                <div className="profile-top-panel avatar">
                  <Avatar
                    className="profile-image"
                    refreshTrigger={avatarRefresh}
                  />
                  {showPencils && (
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
                  <div className="spacer-eighth" />
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
                  <div className="spacer-quarter" />
                  <div className="personal-preferences-row">
                    <h4 className="personal-preferences-title">
                      Personal Preferences
                    </h4>
                  </div>
                  <div className="spacer-quarter" />
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
                      {showPencils && editingField === field ? (
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
                          {showPencils && (
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
                          {showPencils && (
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
                  <div className="spacer-quarter" />
                  <h5
                    className="edit-toggle-link"
                    style={{ cursor: "pointer", textAlign: "right", margin: 0 }}
                    onClick={() => setShowPencils((v) => !v)}
                  >
                    {showPencils ? "Hide" : "Edit"}
                  </h5>
                  <div className="spacer-quarter" />
                  <div className="desc-row">
                    <p className="desc-bold">User Recipes:</p>
                  </div>
                  <div className="spacer-eighth" />
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
                  <div className="spacer-quarter" />
                  <div className="desc-row">
                    <p className="desc-bold">Recipe Box:</p>
                  </div>
                  <div className="spacer-eighth" />
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
            <div className="profile-top-panel-container-right">
              <h2 className="profile-page-panel-title">User Settings</h2>
              <div className="profile-top-panel right">
                <div className="profile-top-panel info">
                  <div className="desc-row">
                    <p className="desc-bold">Email Updates</p>
                    <p className="desc-reg">yes or no boolean</p>
                  </div>
                  <div className="desc-row">
                    <p className="desc-bold">Newsletter</p>
                    <p className="desc-reg">yes or no boolean</p>
                  </div>
                  <div className="desc-row">
                    <p className="desc-bold">Notification Settings</p>
                    <p className="desc-reg">email, pings for likes</p>
                  </div>
                  <div className="desc-row">
                    <p className="desc-bold">Delete Account </p>
                    <p className="desc-reg">go to subpage</p>
                  </div>
                  <div className="spacer-quarter" />
                  <div className="desc-row">
                    <p className="desc-bold">Privacy Settings:</p>
                  </div>
                  <div className="spacer-eighth" />
                  <div className="micro-desc">
                    <img
                      src={theme === "dark" ? tinylikeddark : tinylikedlight}
                      alt="likes"
                      className="likes"
                    />
                    <p className="micro-bold">Visibility: </p>
                    <p className="micro-reg">other sub settings</p>
                    <p className="micro-div"> | </p>
                    <img
                      src={theme === "dark" ? tinysaveddark : tinysavedlight}
                      alt="saves"
                      className="saves"
                    />
                    <p className="micro-bold">Blocked Users: </p>
                    <p className="micro-reg">mapped out list, unblock button</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-bottom-panel">
            <h3 className="profile-page-panel-title">Author Biography</h3>
            <p className="profile-page-panel-desc">
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?"
            </p>
          </div>
        </main>
        <footer className="profile-page-footer">
          <p>Footer Content</p>
        </footer>
      </div>
    </div>
  );
}

export default UserPage;
