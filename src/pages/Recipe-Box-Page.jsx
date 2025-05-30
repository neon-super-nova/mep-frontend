import "../page-css/recipe-box-page.css";
import { useTheme } from "../context/theme-context";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import avatar from "../components/img/user/default-user-light_web.png";

function RecipeBoxPage() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark-mode" : ""}>
      <div className="recipe-page">
        <HeaderBar />
        <main
          className="recipe-page-main-content"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div
            className="recipe-page-left-panel"
            style={{ textAlign: "center" }} >
            <h2 className="recipe-page-panel-title">RECIPE BOX</h2>
            <img src={avatar} alt="landing" className="recipe-image" />
          </div>
          <div
            className="recipe-page-left-panel"
            style={{ textAlign: "center" }}>
            <h2 className="recipe-page-panel-title">RECIPE BOX</h2>
            <p className="recipe-page-panel-desc">Left panel content goes here.</p>
          </div>
          <div
            className="recipe-page-left-panel"
            style={{ textAlign: "center" }}>
            <h2 className="recipe-page-panel-title">RECIPE BOX</h2>
            <p className="recipe-page-panel-desc">Left panel content goes here.</p>
          </div>
          <div
            className="recipe-page-left-panel"
            style={{ textAlign: "center" }}>
            <h2 className="recipe-page-panel-title">RECIPE BOX</h2>
            <p className="recipe-page-panel-desc">Left panel content goes here.</p>
          </div>
        </main>
        <footer className="recipe-page-footer">
          <p>Footer Content</p>
        </footer>
      </div>
    </div>
  );
}

export default RecipeBoxPage;
