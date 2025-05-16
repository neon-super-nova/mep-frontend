import { useState } from "react";
import logoLightModeWeb from "../components/img/logos/logoLightModeWeb.png";
import UserDropdown from "../components/ui-basic-reusables/dropdown-menus/user-dropdown";
import { cuisineData } from "../data/cuisineData";
import "../page-css/advanced-search-page.css";

function AdvancedSearchPage() {
  const [activeCategories, setActiveCategories] = useState(null);
  const handleActiveCategories = (category) => {
    setActiveCategories(activeCategories === category ? null : category);
  };
  return (
    <div className="advanced-search-page">
      {/* Header */}
      <header className="advanced-search-page-header">
        <img
          src={logoLightModeWeb}
          alt="Logo"
          className="advanced-search-page-logo"
        />
        <UserDropdown />
      </header>

      {/* Main Content */}
      <main className="advanced-search-page-main-content">
        {/* Left Panel */}
        <div className="advanced-search-page-left-panel">
          <h2 className="advanced-search-page-title">FILTERS</h2>

          {/* Cuisine Region Filter */}
          <div className="advanced-search-page-filter-box">
            <p className="advanced-search-page-filter-name">CUISINE REGION</p>
            <ul className="advanced-search-page-filter-list">
              {Object.entries(cuisineData).map(([category, subcategories]) => (
                <li
                  key={category}
                  className="advanced-search-page-filter-has-submenu"
                >
                  <label className="label-checkbox">
                    <input
                      type="checkbox"
                      name="cuisine"
                      value={category.toLowerCase()}
                      className="input-checkbox"
                      onChange={() => handleActiveCategories(category)}
                    />
                    <span className="custom-box"></span>
                    <span className="checkbox-text">{category}</span>
                    {subcategories.length > 0 && <span> ▸</span>}
                  </label>

                  {activeCategories === category &&
                    subcategories.length > 0 && (
                      <ul className="advanced-search-page-filter-submenu">
                        {subcategories.map((sub) => (
                          <li key={sub}>
                            <label className="label-checkbox">
                              <input
                                type="checkbox"
                                name="cuisine-sub"
                                value={sub.toLowerCase()}
                                className="input-checkbox"
                              />
                              <span className="custom-box"></span>
                              <span className="checkbox-text">{sub}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Panel */}
        <div className="advanced-search-page-right-panel"></div>
      </main>
    </div>
  );
}

export default AdvancedSearchPage;
