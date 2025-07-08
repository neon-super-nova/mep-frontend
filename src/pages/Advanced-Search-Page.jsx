import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { cuisineData } from "../data/cuisineData";
import "../page-css/advanced-search-page.css";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import { useTheme } from "../context/theme-context";
import { SearchOptionsProvider } from "../context/search-options-context";
import AdvancedSearchBarEnum from "../components/ui-basic-reusables/other/advance-search-bar-enum";
import AdvancedSearchBarType from "../components/ui-basic-reusables/other/advance-search-bar-type";
import AdvancedBlocks from "../components/ui-basic-reusables/blocks/advanced-block";
import axios from "axios";

function AdvancedSearchPage() {
  const { theme } = useTheme();
  const [activeCategories, setActiveCategories] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);
  const navigate = useNavigate();

  const handleActiveCategories = (category) => {
    setActiveCategories((prev) => (prev === category ? null : category));
  };

  const sortOptions = ["Salmon Croquettes", "Tuna Salad", "Chicken Alfredo"];

  const displayOptions = ["Salmon Croquettes", "Tuna Salad", "Chicken Alfredo"];

  useEffect(() => {
    async function fetchAllRecipes() {
      try {
        const response = await axios.get("/api/recipes");
        // Use .recipes if present, otherwise fallback to response.data
        setAllRecipes(
          Array.isArray(response.data)
            ? response.data
            : response.data.recipes || []
        );
      } catch (err) {
        console.error("Error fetching all recipes:", err);
        setAllRecipes([]);
      }
    }
    fetchAllRecipes();
  }, []);

  const recipeBlocks = Array.isArray(allRecipes)
    ? allRecipes.map((recipe) => ({
        recipe,
        onClick: () => navigate(`/recipe/${recipe._id}`),
        type: "submitted",
      }))
    : [];

  /*
const uniqueCuisineRegions = [
  ...new Set(allRecipes.map(r => r.cuisineRegion).filter(Boolean))
];
const uniqueDietaryRestrictions = [
  ...new Set(allRecipes.map(r => r.dietaryRestriction).filter(Boolean))
];
*/

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="advanced-search-page">
        <HeaderBar />
        <main className="advanced-search-page-main-content">
          <div className="advanced-search-page-left-panel">
            <h2 className="advanced-search-page-title">FILTERS</h2>
            <div className="advanced-search-page-filter-box">
              <p className="advanced-search-page-filter-name">CUISINE REGION</p>
              <ul className="advanced-search-page-filter-list">
                {Object.entries(cuisineData).map(
                  ([category, subcategories]) => (
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
                        {subcategories.length > 0 && (
                          <span className="submenu-arrow">&nbsp;▸</span>
                        )}
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
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="advanced-search-page-right-panel">
            <h2 className="advanced-search-page-title">ADVANCED SEARCH</h2>
            <div className="advanced-search-page-search-bar">
              <span className="advanced-search-page-search-bar-label">
                <h5>label</h5>
                <AdvancedSearchBarType />
              </span>
              <span className="advanced-search-page-search-bar-label">
                <h5>label</h5>{" "}
                <SearchOptionsProvider options={sortOptions}>
                  <AdvancedSearchBarEnum />
                </SearchOptionsProvider>
              </span>
              <span className="advanced-search-page-search-bar-label">
                <h5>label</h5>{" "}
                <SearchOptionsProvider options={displayOptions}>
                  <AdvancedSearchBarEnum />
                </SearchOptionsProvider>
              </span>
            </div>
            <div className="tags-container">
              <span className="advanced-search-page-tags-label">
                <h5>label</h5>
              </span>
            </div>
            <div className="advanced-search-page-tags">
              <span className="advanced-search-page-tag">Tag 1</span>
              <span className="advanced-search-page-tag">Tag 2</span>
              <span className="advanced-search-page-tag">Tag 3</span>
            </div>
            <div className="advanced-search-page-advanced-blocks">
              {Array.isArray(allRecipes) && allRecipes.length > 0 ? (
                <AdvancedBlocks
                  subheading="Browse by Cuisine Region"
                  blocks={recipeBlocks}
                />
              ) : (
                <div>No recipes found.</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdvancedSearchPage;
