import "../page-css/home-page.css";
import UserDropdown from "../components/ui-basic-reusables/dropdown-menus/user-dropdown";
import logoLightModeWeb from "../components/img/logos/logoLightModeWeb.png";

function HomePage() {
  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <img src={logoLightModeWeb} alt="Logo" className="logo" />
        <UserDropdown /> {/* Placeholder for the dropdown component */}
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Panel */}
        <div className="left-panel">
          <h2>Left Panel (8/12)</h2>
          <p>Content for the left panel goes here.</p>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <h2>Right Panel (4/12)</h2>
          <p>Content for the right panel goes here.</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Footer Content</p>
      </footer>
    </div>
  );
}

export default HomePage;
