import "../page-css/home-page.css";
import { Link } from "react-router-dom";
import UserDropdown from "../components/ui-basic-reusables/dropdown-menus/user-dropdown";
import SearchBar from "../components/ui-basic-reusables/other/search-bar";
import logoLightModeWeb from "../components/img/logos/logoLightModeWeb.png";

function HomePage() {
  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-page-header">
        <img src={logoLightModeWeb} alt="Logo" className="home-page-logo" />
        <UserDropdown /> {/* Placeholder for the dropdown component */}
      </header>

      {/* Main Content */}
      <main className="home-page-main-content">
        {/* Left Panel */}
        <div className="home-page-left-panel">
          <h2 className="home-page-right-panel-title">RECIPE LOOKUP</h2>
          {/* Search bar */}
          <div className="home-page-left-panel-search-div">
            <p className="home-page-left-panel-subtitles">SEARCH</p>
            <SearchBar />
            {/* Advanced bar */}
            <div className="home-page-left-panel-advanced-search">
              <p className="home-page-left-panel-advanced-search-reg">or use</p>
              <Link className="home-page-left-panel-advanced-search-bold">
                Advanced search
              </Link>
            </div>
            {/* Browse part */}
            <div className="home-page-left-panel-browse-div">
              <p className="home-page-left-panel-subtitles">BROWSE</p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="home-page-right-panel">
          <h2>Right panel</h2>
          <p>Content for the right panel goes here.</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="home-page-footer">
        <p>Footer Content</p>
      </footer>
    </div>
  );
}

export default HomePage;
