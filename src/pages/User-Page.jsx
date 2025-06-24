import "../page-css/user-page.css";
import { useState } from "react";
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
import { useEffect } from "react";
// import { useScript } from "react-apple-signin-auth";

function UserPage() {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
 

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
      } catch (err) {
        if (err.response) {
          alert(err.response.data.error);
        }
      }
    };
    getUser();
  }, []);

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

      } catch (err) {
        if (err.response) {
          alert(err.response.data.error);
        }
      }
    };
    getCount();
  }, []);

  // fetching user-info collection: favorite cuisine, meal, dish, and dietary restrictions

  const [userInfo, setUserInfo] = useState({
    favoriteCuisine: "",
    favoriteMeal: "",
    favoriteDish: "",
    dietaryRestriction: [],
  });

  const { favoriteCuisine, favoriteMeal, favoriteDish, dietaryRestriction } =
    userInfo;

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
      } catch (err) {
        if (err.response) {
          alert(err.response.data.error);
        }
      }
    };
    getUserInfo();
  }, []);

  const signupDate = user?.signupDate
    ? new Date(user.signupDate).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : "signupDate(##/##/####)";

  const db_recipe_saved = "000000";
  //const db_recipe_liked = "000000";
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
                  <Avatar className="profile-image" />
                </div>
                <div className="profile-top-panel info">
                  <div className="desc-row">
                    <p className="desc-bold">Username:</p>
                    <p className="desc-reg">{username}</p>
                  </div>
                  <div className="desc-row"></div>
                  <div className="desc-row">
                    <p className="desc-bold">Full Name:</p>
                    <p className="desc-reg name">{fullname}</p>
                  </div>
                  <div style={{ height: "0.25rem" }}></div>
                  <div className="desc-row">
                    <p className="desc-bold">Signup Date:</p>
                    <p className="desc-reg">{signupDate}</p>
                  </div>
                    <div style={{ height: "0.25rem" }}></div>
                          <div className="desc-row">
                      <p className="desc-bold">Favorite Global Cuisine:</p>
                      <p className="desc-reg">{favoriteCuisine}</p>
                    </div>
                    <div className="desc-row">
                      <p className="desc-bold">Favorite Meal:</p>
                      <p className="desc-reg">{favoriteMeal}</p>
                    </div>
                    <div className="desc-row">
                      <p className="desc-bold">Favorite Dish:</p>
                      <p className="desc-reg">{favoriteDish}</p>
                    </div>
                    <div className="desc-row">
                      <p className="desc-bold">Diet Restrictions: </p>
                      <p className="desc-reg">
                        {dietaryRestriction.join(", ")}
                      </p>
                    </div>
                  <div style={{ height: "0.25rem" }}></div>
                  <div className="desc-row">
                    <p className="desc-bold">User Recipes:</p>
                  </div>
                  <div style={{ height: "0.005rem" }}></div>
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
                                      <div style={{ height: "0.25rem" }}></div>
                  <div className="desc-row">
                    <p className="desc-bold">Recipe Box:</p>
                  </div>
                  <div style={{ height: "0.005rem" }}></div>
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
                {userInfo ? (
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
                      <p className="desc-reg">
                        go to subpage
                      </p>
                    </div>
                    <div style={{ height: "0.25rem" }}></div>
                  <div className="desc-row">
                    <p className="desc-bold">Privacy Settings:</p>
                  </div>
                  <div style={{ height: "0.005rem" }}></div>
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
                ) : (
                  <p>Loading</p>
                )}
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
