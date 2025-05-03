import '../page-css/home-page.css';
import UserDropdown from '../components/ui-basic-reusables/dropdown-menus/user-dropdown';
import logoLightModeWeb from '../components/img/logos/logoLightModeWeb.png';

function HomePage() {
  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-page-header">
      <img src={logoLightModeWeb} alt="Logo" className="home-page-logo"/>
        <UserDropdown /> {/* Placeholder for the dropdown component */}
      </header>

      {/* Main Content */}
      <main className="home-page-main-content">
        {/* Left Panel */}
        <div className="home-page-left-panel">
          <h2>Left Panel (8/12)</h2>
          <p>Content for the left panel goes here.</p>
        </div>

        {/* Right Panel */}
        <div className="home-page-right-panel">
          <h2>Right Panel (4/12)</h2>
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