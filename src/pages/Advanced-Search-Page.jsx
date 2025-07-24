import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../page-css/advanced-search-page.css";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import { useTheme } from "../context/theme-context";
import { SearchOptionsProvider } from "../context/search-options-context";
import AdvancedSearchBarEnum from "../components/ui-basic-reusables/other/advance-search-bar-enum";
import AdvancedSearchBarType from "../components/ui-basic-reusables/other/advance-search-bar-type";
import RecipeTags from "../components/ui-basic-reusables/labels/label-tag-food";
import AdvancedBlocks from "../components/ui-basic-reusables/blocks/advanced-block";
import FilterBlock from "../components/ui-basic-reusables/other/advance-search-filter-blocks";
import axios from "axios";

function AdvancedSearchPage() {
  const { theme } = useTheme();
  const [allRecipes, setAllRecipes] = useState([]);
  const navigate = useNavigate();

  const [matches, setMatches] = useState(0);

  const [selectedCuisineRegion, setSelectedCuisineRegion] = useState(null);
  const [selectedDietaryRestriction, setSelectedDietaryRestriction] =
    useState(null);
  const [selectedProteinChoice, setSelectedProteinChoice] = useState(null);
  const [selectedReligiousRestriction, setSelectedReligiousRestriction] =
    useState(null);

  useEffect(() => {
    runFilteredSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedCuisineRegion,
    selectedProteinChoice,
    selectedDietaryRestriction,
    selectedReligiousRestriction,
  ]);

  const sortOptions = ["most popular", "newest", "trending?"];
  const displayOptions = ["small thumbnails", "large thumbnails", "list view"];

  const recipeBlocks = Array.isArray(allRecipes)
    ? allRecipes.map((recipe) => ({
        recipe,
        onClick: () => navigate(`/recipe/${recipe._id}`),
        type: "submitted",
      }))
    : [];

  const getSelectedFilters = () => {
    const params = {};
    if (selectedCuisineRegion?.value) {
      selectedCuisineRegion.type === "parent"
        ? (params.cuisineRegion = selectedCuisineRegion.value.toLowerCase())
        : (params.cuisineSubregion = selectedCuisineRegion.value.toLowerCase());
    }
    if (selectedProteinChoice) {
      params.proteinChoice = selectedProteinChoice.toLowerCase();
    }
    if (selectedDietaryRestriction) {
      params.dietaryRestriction = selectedDietaryRestriction.toLowerCase();
    }
    if (selectedReligiousRestriction) {
      params.religiousRestriction = selectedReligiousRestriction.toLowerCase();
    }
    return new URLSearchParams(params).toString();
  };

  const runFilteredSearch = async () => {
    const queryParams = getSelectedFilters();
    console.log("query params are " + queryParams);

    const response = await axios.get(`api/recipes/search?${queryParams}`);
    const foundRecipes = response.data.recipes;
    const numberOfFoundRecipes = foundRecipes.length;
    if (response.error) {
      setAllRecipes([]);
      setMatches(0);
    }
    setAllRecipes(foundRecipes);
    setMatches(numberOfFoundRecipes);
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="advanced-search-page">
        <HeaderBar />
        <main className="advanced-search-page-main-content">
          <div className="advanced-search-page-left-panel">
            <h2 className="advanced-search-page-title">FILTERS</h2>
            <FilterBlock
              filterName="CUISINE REGION"
              filterCategory="cuisineRegion"
              selectedFilter={selectedCuisineRegion}
              setSelectedFilter={setSelectedCuisineRegion}
            />
            <FilterBlock
              filterName="PROTEIN CHOICE"
              filterCategory="proteinChoice"
              selectedFilter={selectedProteinChoice}
              setSelectedFilter={setSelectedProteinChoice}
            />
            <FilterBlock
              filterName="DIETARY RESTRICTION"
              filterCategory="dietaryRestriction"
              selectedFilter={selectedDietaryRestriction}
              setSelectedFilter={setSelectedDietaryRestriction}
            />
            <FilterBlock
              filterName="RELIGIOUS RESTRICTION"
              filterCategory="religiousRestriction"
              selectedFilter={selectedReligiousRestriction}
              setSelectedFilter={setSelectedReligiousRestriction}
            />
          </div>
          <div className="advanced-search-page-right-panel">
            <h2 className="advanced-search-page-title">ADVANCED SEARCH</h2>
            <div className="advanced-search-page-search-bar">
              <span>
                <h5 className="advanced-search-page-search-bar-label">
                  search for:
                </h5>
                <AdvancedSearchBarType />
              </span>
              <span>
                <h5 className="advanced-search-page-search-bar-label">
                  sort by
                </h5>{" "}
                <SearchOptionsProvider options={sortOptions}>
                  <AdvancedSearchBarEnum />
                </SearchOptionsProvider>
              </span>
              <span>
                <h5 className="advanced-search-page-search-bar-label">
                  view as:
                </h5>{" "}
                <SearchOptionsProvider options={displayOptions}>
                  <AdvancedSearchBarEnum />
                </SearchOptionsProvider>
              </span>
            </div>
            <div className="tags-container">
              <div className="advanced-search-page-tags">
                <span className="advanced-search-page-tags-label">
                  <h5>
                    {matches === 1 ? (
                      <span className="food-bold">{matches} match found</span>
                    ) : (
                      <span className="food-bold">{matches} matches found</span>
                    )}{" "}
                  </h5>
                </span>
                <RecipeTags
                  recipe={{
                    cuisineRegion: selectedCuisineRegion?.value,
                    dietaryRestriction: selectedDietaryRestriction,
                    proteinChoice: selectedProteinChoice,
                    religiousRestriction: selectedReligiousRestriction,
                  }}
                  noTagsText={
                    <span className="advanced-no-tags-text">
                      (No filters selected)
                    </span>
                  }
                />
              </div>
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
