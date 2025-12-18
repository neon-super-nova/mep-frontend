import "../page-css/user-page.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/theme-context";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import Avatar from "../components/ui-basic-reusables/icons/avatar.jsx";
import ToggleButton from "../components/ui-basic-reusables/buttons/button-toggle.jsx";
import ButtonRadioGroup from "../components/ui-basic-reusables/buttons/button-radio-group.jsx";
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

  const [showPencils, setShowPencils] = useState(false);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState("");

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

  // fetching user recipe and like count
  const [recipeCount, setRecipeCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
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

  const notificationChoices = [
    {
      value: "email-updates",
      label:
        "Update me through email when someone likes or comments on my recipes",
    },
    {
      value: "text-message-updates",
      label:
        "Update me through text when someone likes or comments on my recipes",
    },
    {
      value: "both",
      label:
        "Update me through both email and text when someone likes or comments on my recipes",
    },
    { value: "none", label: "Do none of the above" },
  ];

  // change with backend logic when applicable

  const [notificationChoice, setNotificationChoice] = useState(
    notificationChoices[0].value
  );

  const [emailOpen, setEmailOpen] = useState(
    localStorage.getItem("emailOpen") === "true"
  );

  const [newsletterOpen, setNewsletterOpen] = useState(
    localStorage.getItem("newsletterOpen") === "true"
  );

  useEffect(() => {
    const storedNotificationChoice = localStorage.getItem("notificationChoice");
    if (storedNotificationChoice)
      setNotificationChoice(storedNotificationChoice);

    const storedEmailOpen = localStorage.getItem("emailOpen");
    if (storedEmailOpen !== null) setEmailOpen(storedEmailOpen === "true");

    const storedNewsletterOpen = localStorage.getItem("newsletterOpen");
    if (storedNewsletterOpen !== null)
      setNewsletterOpen(storedNewsletterOpen === "true");
  }, []);

  const handleNotificationChange = (choice) => {
    setNotificationChoice(choice);
    localStorage.setItem("notificationChoice", choice);
  };

  const handleEmailOpenChange = (open) => {
    setEmailOpen(open);
    localStorage.setItem("emailOpen", open);
  };

  const handleNewsletterOpenChange = (open) => {
    setNewsletterOpen(open);
    localStorage.setItem("newsletterOpen", open);
  };

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
                    <ToggleButton
                      onLabel="Yes"
                      offLabel="No"
                      value={emailOpen}
                      onPress={handleEmailOpenChange}
                    />
                  </div>
                  <div className="desc-row">
                    <p className="desc-bold">Newsletter</p>
                    <p className="desc-reg">yes or no boolean</p>
                    <ToggleButton
                      value={newsletterOpen}
                      onPress={handleNewsletterOpenChange}
                    />
                  </div>
                   <div className="spacer-quarter" />
                  <div className="notification-choices-row">
                    <p className="desc-bold">Notification Settings</p>
                    <div className="spacer-quarter" />
                    <div className="desc-choice">
                      <div className="notification-radio-group">
                        <ButtonRadioGroup
                          options={notificationChoices}
                          value={notificationChoice}
                          onChange={handleNotificationChange}
                          className="user-radio"
                          circleDotColor="var(--main-accent-color-alt)"
                          circleDotStrokeWidth={4}
                          circleDotSize={10}
                          circleColor="var(--text-color)"
                          circleStrokeWidth={2.75}
                          circleSize={10}
                        />
                      </div>
                    </div>
                  </div>
                   <div className="spacer-quarter" />
                  <div className="desc-row">
                    
                    <p className="desc-bold">User Bio </p>
                    <p className="desc-reg">go to subpage</p>
                  </div>
                  <div className="spacer-quarter" />
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
            <h3 className="profile-page-panel-title">ACCOUNT SETTINGS</h3>
            <p className="profile-page-panel-desc">
             "Delete Account" - link to go to page or modal
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
