import "../page-css/home-page.css";
import { Link } from "react-router-dom";
import UserDropdown from "../components/ui-basic-reusables/dropdown-menus/user-dropdown";
import SearchBar from "../components/ui-basic-reusables/other/search-bar";
import BrowseBlocks from "../components/ui-basic-reusables/other/browse-blocks";
import TrendingRecipe from "../components/ui-basic-reusables/other/trending-recipe";
import logoLightModeWeb from "../components/img/logos/logoLightModeWeb.png";
import bananaBread from "../components/img/dummy/bananabread.jpg";
import macncheese from "../components/img/dummy/macncheese.jpg";

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
          <h2 className="home-page-panel-title">RECIPE LOOKUP</h2>
          {/* Search bar */}
          <div className="home-page-left-panel-search-div">
            <p className="home-page-left-panel-subtitles">SEARCH</p>
            <SearchBar />
            {/* Advanced bar */}
            <div className="home-page-left-panel-advanced-search">
              <p className="home-page-left-panel-advanced-search-reg">or use</p>
              <Link
                to="/advancedsearch"
                className="home-page-left-panel-advanced-search-bold"
              >
                Advanced Search
              </Link>
            </div>
          </div>
          {/* Browse part */}
          <div className="home-page-left-panel-browse-div">
            <p className="home-page-left-panel-subtitles">BROWSE:</p>
            <BrowseBlocks
              subheading="By Region"
              columns={8}
              blocks={[
                { label: "Latin-American", onClick: () => {} },
                { label: "Caribbean", onClick: () => {} },
                { label: "North American", onClick: () => {} },
                { label: "Middle Eastern", onClick: () => {} },
                { label: "South Asian", onClick: () => {} },
                { label: "East Asian", onClick: () => {} },
                { label: "Southeast Asian", onClick: () => {} },
                { label: "African", onClick: () => {} },
                { label: "European", onClick: () => {} },
                { label: "Hawaiian/Pacific Islander", onClick: () => {} },
              ]}
            />
            <BrowseBlocks
              subheading="By Protein Choice"
              blocks={[
                {
                  label: "Poultry",
                  onClick: () => {},
                },
                {
                  label: "Red Meat",
                  onClick: () => {},
                },
                {
                  label: "Pescatarian",
                  onClick: () => {},
                },
                {
                  label: "Vegetarian",
                  onClick: () => {},
                },
                {
                  label: "Vegan",
                  onClick: () => {},
                },
              ]}
            />
            <BrowseBlocks
              subheading="By Diet Restriction"
              blocks={[
                {
                  label: "Gluten free",
                  onClick: () => {},
                },
                {
                  label: "Dairy free",
                  onClick: () => {},
                },
                {
                  label: "Nut free",
                  onClick: () => {},
                },
                {
                  label: "Shellfish free",
                  onClick: () => {},
                },
                {
                  label: "Low carb",
                  onClick: () => {},
                },
              ]}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="home-page-right-panel">
          <h2 className="home-page-panel-title">TRENDING</h2>
          <TrendingRecipe
            recipeImage={bananaBread}
            recipeName="Banana Bread"
            recipeRating={4.8}
            recipeDescription="A moist, delicious banana bread recipe perfect for any time of day."
            recipeTags={["Vegetarian", "kosher", "Dairy-free"]}
          />
          <TrendingRecipe
            recipeImage={macncheese}
            recipeName="Mac & Cheese Supreme"
            recipeRating={3.8}
            recipeDescription="Creamy, cheesy, and oven-baked to perfection. This is a comfort food classic with a gourmet twist."
            recipeTags={["Vegetarian", "American"]}
          />
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
