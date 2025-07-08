import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import "../page-css/submit-recipe-page.css";
import { useTheme } from "../context/theme-context";

function SubmitRecipePage() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark-mode" : ""}>
    <div className="submit-recipe-page">
      <HeaderBar />
      <main className="submit-recipe-main-content">
        <h1 className="submit-recipe-title">Submit a Recipe</h1>
      </main>
      <footer className="submit-recipe-footer">
        <p>Footer Content</p>
      </footer>
    </div>
    </div>
  );
}

export default SubmitRecipePage;
