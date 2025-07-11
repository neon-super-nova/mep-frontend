import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import "../page-css/submit-recipe-page.css";
import dummyV1 from "../components/img/dummy/placeholder_1.jpg";
import dummyV2 from "../components/img/dummy/placeholder_2.jpg";

import { useTheme } from "../context/theme-context";
import { useState, useEffect } from "react";
import { getUserId } from "../context/decodeToken.js";
import axios from "axios";

function SubmitRecipePage() {
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
      } catch (err) {}
    };
    getUser();
  }, []);

  const recipeTitle = "Title Your Recipe Here";
  const recipeDescription = "Add a brief description of your recipe here.";
  const uploadUrl = "https://example.com/upload";

  return (
    <div className={theme === "dark" ? "dark-mode" : ""}>
      <div className="submit-recipe-page">
        <HeaderBar />
          <h1 className="submit-recipe-title">Submit a Recipe</h1>
        <main className="submit-recipe-main-content">
          <div className="submit-recipe-major-left">
            <div className="submit-recipe-small">
              <h6>
                <span className="bold">Recipe Title: </span>
                <span style={{ width: "0.5rem" }}></span>
                <span className="reg">{recipeTitle}</span>
              </h6>
              <h6>
                <span className="bold">Author: </span>
                <span style={{ width: "0.5rem" }}></span>
                <span className="reg">
                  {user ? `${fullname}` : "Loading..."}
                </span>
                <div style={{ width: "1.75rem" }}></div>
                <span className="reg">
                  ({user ? `${username}` : "Loading..."})
                </span>
              </h6>
              <h6>
                <span className="bold">date submitting: </span>
                <span style={{ width: "0.5rem" }}></span>
                <span className="reg">
                  {" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </h6>
            </div>
            <div className="submit-recipe-headline">
              <p>
                {recipeDescription ||
                  "Add a brief description of your recipe here."}
              </p>
            </div>
            <div className="submit-recipe-image">
              <img
                src={!uploadUrl ? dummyV1 : uploadUrl}
                alt={uploadUrl}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = dummyV1;
                }}
              />
              <img src={dummyV2} alt={uploadUrl} />
              <img src={dummyV1} alt={uploadUrl} />
            </div>
            <p className="submit-recipe-image-link">
              Upload an image of your recipe here.(link, up to 3)
            </p>
          </div>
          <div className="submit-recipe-major-right">
            <div className="submit-recipe-notes">
              <div className="left">
                <p>recipe tags and user rating (unapplicable)</p>
              </div>
              <div className="right">
                <p>cook, prep, total time and number of servings from recipe</p>
              </div>
            </div>
            <div className="submit-recipe-details">
              <div className="left">
                <p>ingredients</p>
              </div>
              <div className="right">
                <p>instructions and special equipment callout</p>
              </div>
            </div>
              <div className="submit-recipe-author-notes">
              <h3> Author Notes</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </main>
        <footer className="submit-recipe-footer">
          <p>Footer Content</p>
        </footer>
      </div>
    </div>
  );
}

export default SubmitRecipePage;
