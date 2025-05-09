import "../page-css/home-page.css";
import UserDropdown from "../components/ui-basic-reusables/dropdown-menus/user-dropdown";
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
          <div className="home-page-left-panel-search-div">
            <p className="home-page-left-panel-search">SEARCH</p>
            <div className="home-page-left-panel-search-wrapper">
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z"
                />
              </svg>
              <input
                className="home-page-left-panel-searchbar"
                type="search"
                placeholder="Salmon Croquettes"
              />
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
