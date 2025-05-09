import "../page-css/home-page.css";
import { Link } from "react-router-dom";
import UserDropdown from "../components/ui-basic-reusables/dropdown-menus/user-dropdown";
import SearchBar from "../components/ui-basic-reusables/other/search-bar";
import BrowseBlocks from "../components/ui-basic-reusables/other/browse-blocks";
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
              <BrowseBlocks
                subheading="By Region"
                columns={8}
                blocks={[
                  { label: "Latin-American", onClick: () => {} },
                  { label: "Caribbean", onClick: () => {} },
                  { label: "North American", onClick: () => {} },
                  { label: "Middle Eastern", onClick: () => {} },
                  { label: "East Asian", onClick: () => {} },
                  { label: "Southeast Asian", onClick: () => {} },
                  { label: "African", onClick: () => {} },
                  { label: "Hawaiian", onClick: () => {} },
                  { label: "European", onClick: () => {} },
                ]}
              />
              <BrowseBlocks
                subheading="By Protein Choice"
                blocks={[
                  {
                    label: "Poultry",
                    onClick: () => console.log("Clicked 1"),
                  },
                  {
                    label: "Red Meat",
                    onClick: () => console.log("Clicked 2"),
                  },
                  {
                    label: "Pescatarian",
                    onClick: () => console.log("Clicked 3"),
                  },
                  {
                    label: "Vegan",
                    onClick: () => console.log("Clicked 4"),
                  },
                ]}
              />
              <BrowseBlocks
                subheading="By Allergen Restriction"
                blocks={[
                  {
                    label: "Gluten free",
                    onClick: () => console.log("Clicked 1"),
                  },
                  {
                    label: "Dairy free",
                    onClick: () => console.log("Clicked 2"),
                  },
                  {
                    label: "Nut free",
                    onClick: () => console.log("Clicked 3"),
                  },
                  {
                    label: "Shellfish free",
                    onClick: () => console.log("Clicked 4"),
                  },
                ]}
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
