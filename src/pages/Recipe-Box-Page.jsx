import "../page-css/recipe-box-page.css";
import { useTheme } from "../context/theme-context";
import { useState } from "react";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import hardcodedUser from "../context/hardcoded-user";
import RecipeBlock from "../components/ui-basic-reusables/blocks/recipe-block";
import { ArrowLeft, ArrowRight } from "lucide-react";
import iconImgDark from "../components/img/recipe-box/recipesDark.png";
import iconImgLight from "../components/img/recipe-box/recipesLight.png";

function RecipeBoxPage() {
  const { theme } = useTheme();
  const [submittedPage, setSubmittedPage] = useState(1);
  const [savedPage, setSavedPage] = useState(1);
  const user = hardcodedUser;

  const username = user?.username || "username";
  const signupDate = user?.signupDate
    ? new Date(user.signupDate).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : "signupDate(##/##/####)";

  const PAGE_SIZE = 7;

  const submittedRecipes = hardcodedUser.userSubmittedRecipes;
  const submittedStart = (submittedPage - 1) * PAGE_SIZE;
  const submittedEnd = submittedStart + PAGE_SIZE;
  const pagedSubmitted = submittedRecipes.slice(submittedStart, submittedEnd);

  const savedRecipes = hardcodedUser.userSavedRecipes;
  const savedStart = (savedPage - 1) * PAGE_SIZE;
  const savedEnd = savedStart + PAGE_SIZE;
  const pagedsaved = savedRecipes.slice(savedStart, savedEnd);

  return (
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
                <span className="reg"> {signupDate}</span>
              </h6>
              <h6>
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
                <span className="bold">subheading:</span>
                <span className="reg"> subheading contents</span>
              </h6>
              <h6>
                <span className="bold">subheading2:</span>
                <span className="reg"> subheading contents2</span>
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

              {pagedSubmitted.map((recipe, idx) => (
                <RecipeBlock key={idx} recipe={recipe} type="submitted" />
              ))}

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
                <span className="bold">subheading:</span>
                <span className="reg"> subheading contents</span>
              </h6>
              <h6>
                <span className="bold">subheading2:</span>
                <span className="reg"> subheading contents2</span>
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
