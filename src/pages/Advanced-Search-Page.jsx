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
import RecipeTags from "../components/ui-basic-reusables/labels/label-tag-food";

import AdvancedBlocks from "../components/ui-basic-reusables/blocks/advanced-block";
import axios from "axios";

function AdvancedSearchPage() {
  const { theme } = useTheme();
  const [activeCategories, setActiveCategories] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);
  const navigate = useNavigate();
  const matches = Array.isArray(allRecipes) ? allRecipes.length : 0;

  const handleActiveCategories = (category) => {
    setActiveCategories((prev) => (prev === category ? null : category));
  };

  // const [selectedCuisineRegion, setSelectedCuisineRegion] = useState(null);
  const [selectedDietaryRestriction, setSelectedDietaryRestriction] =
    useState(null);
  const [selectedProteinChoice, setSelectedProteinChoice] = useState(null);
  const [selectedReligiousRestriction, setSelectedReligiousRestriction] =
    useState(null);

  const sortOptions = ["most popular", "newest", "trending?"];
  const displayOptions = ["small thumbnails", "large thumbnails", "list view"];

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
                {Object.entries(cuisineData.cuisineRegion).map(
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
            <div className="advanced-search-page-filter-box">
              <p className="advanced-search-page-filter-name">PROTEIN CHOICE</p>
              <ul className="advanced-search-page-filter-list">
                {Array.isArray(cuisineData.proteinChoice)
                  ? cuisineData.proteinChoice.map((protein) => (
                      <li
                        key={protein}
                        className="advanced-search-page-filter-no-submenu"
                      >
                        <label className="label-checkbox">
                          <input
                            type="checkbox"
                            name="protein"
                            value={protein.toLowerCase()}
                            className="input-checkbox"
                            onChange={() => {
                              handleActiveCategories(protein);
                              setSelectedProteinChoice(protein);
                            }}
                          />
                          <span className="custom-box"></span>
                          <span className="checkbox-text">{protein}</span>
                        </label>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            <div className="advanced-search-page-filter-box">
              <p className="advanced-search-page-filter-name">
                Dietary Restriction
              </p>
              <ul className="advanced-search-page-filter-list">
                {Array.isArray(cuisineData.dietaryRestriction)
                  ? cuisineData.dietaryRestriction.map((diet) => (
                      <li
                        key={diet}
                        className="advanced-search-page-filter-no-submenu"
                      >
                        <label className="label-checkbox">
                          <input
                            type="checkbox"
                            name="diet"
                            value={diet.toLowerCase()}
                            className="input-checkbox"
                            onChange={() => {
                              handleActiveCategories(diet);
                              setSelectedDietaryRestriction(diet);
                            }}
                          />
                          <span className="custom-box"></span>
                          <span className="checkbox-text">{diet}</span>
                        </label>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            <div className="advanced-search-page-filter-box">
              <p className="advanced-search-page-filter-name">
                religious restriction
              </p>
              <ul className="advanced-search-page-filter-list">
                {Array.isArray(cuisineData.religiousRestriction)
                  ? cuisineData.religiousRestriction.map((religion) => (
                      <li
                        key={religion}
                        className="advanced-search-page-filter-no-submenu"
                      >
                        <label className="label-checkbox">
                          <input
                            type="checkbox"
                            name="religion"
                            value={religion.toLowerCase()}
                            className="input-checkbox"
                            onChange={() => {
                              handleActiveCategories(religion);
                              setSelectedReligiousRestriction(religion);
                            }}
                          />
                          <span className="custom-box"></span>
                          <span className="checkbox-text">{religion}</span>
                        </label>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>

          <div className="advanced-search-page-right-panel">
            <h2 className="advanced-search-page-title">ADVANCED SEARCH</h2>
            <div className="advanced-search-page-search-bar">
              <span className="advanced-search-page-search-bar-label">
                <h5>search for:</h5>
                <AdvancedSearchBarType />
              </span>
              <span className="advanced-search-page-search-bar-label">
                <h5>sort by</h5>{" "}
                <SearchOptionsProvider options={sortOptions}>
                  <AdvancedSearchBarEnum />
                </SearchOptionsProvider>
              </span>
              <span className="advanced-search-page-search-bar-label">
                <h5>view as:</h5>{" "}
                <SearchOptionsProvider options={displayOptions}>
                  <AdvancedSearchBarEnum />
                </SearchOptionsProvider>
              </span>
            </div>
            <div className="tags-container">
              <span className="advanced-search-page-tags-label">
                <h5>{matches} matches found</h5>
              </span>
            </div>
            <div className="advanced-search-page-tags">
              <RecipeTags
                recipe={{
                  cuisineRegion: "Other",
                  dietaryRestriction: selectedDietaryRestriction || "None",
                  proteinChoice: selectedProteinChoice || "None",
                  religiousRestriction: selectedReligiousRestriction || "None",
                }}
              />
          
            </div>
            <div className="advanced-search-page-advanced-blocks">
              {Array.isArray(allRecipes) && allRecipes.length > 0 ? (
                <AdvancedBlocks blocks={recipeBlocks} />
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
