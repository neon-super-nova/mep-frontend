import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const [allRecipes, setAllRecipes] = useState([]);
  const [matches, setMatches] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  // get filters from from URL
  const selectedCuisineRegion = useMemo(() => {
    const sub = searchParams.get("cuisineSubregion");
    const parent = searchParams.get("cuisineRegion");
    if (sub) return { type: "sub", value: sub };
    if (parent) return { type: "parent", value: parent };
    return null;
  }, [searchParams]);

  const selectedProteinChoice = useMemo(
    () => searchParams.get("proteinChoice") || null,
    [searchParams]
  );
  const selectedDietaryRestriction = useMemo(
    () => searchParams.get("dietaryRestriction") || null,
    [searchParams]
  );
  const selectedReligiousRestriction = useMemo(
    () => searchParams.get("religiousRestriction") || null,
    [searchParams]
  );

  // Update URL parameters dynamically
  const handleParamChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (!value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleCuisineChange = (val) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (!val) {
      newParams.delete("cuisineRegion");
      newParams.delete("cuisineSubregion");
    } else if (val.type === "sub") {
      newParams.set("cuisineSubregion", val.value);
      newParams.delete("cuisineRegion");
    } else {
      newParams.set("cuisineRegion", val.value);
      newParams.delete("cuisineSubregion");
    }
    setSearchParams(newParams);
  };

  useEffect(() => {
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    runFilteredSearch(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const runFilteredSearch = async (params) => {
    const queryParams = new URLSearchParams(params).toString();
    try {
      const response = await axios.get(`api/recipes/search?${queryParams}`);
      const foundRecipes = response.data.recipes || [];
      setAllRecipes(foundRecipes);
      setMatches(foundRecipes.length);
    } catch (err) {
      setAllRecipes([]);
      setMatches(0);
    }
  };

  const sortOptions = ["most popular", "newest", "trending?"];
  const displayOptions = ["small thumbnails", "large thumbnails", "list view"];

  const recipeBlocks = allRecipes.map((recipe) => ({
    recipe,
    onClick: () => navigate(`/recipe/${recipe._id}`),
    type: "submitted",
  }));

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
              onChange={handleCuisineChange}
            />

            <FilterBlock
              filterName="PROTEIN CHOICE"
              filterCategory="proteinChoice"
              selectedFilter={selectedProteinChoice}
              onChange={(val) => handleParamChange("proteinChoice", val)}
            />

            <FilterBlock
              filterName="DIETARY RESTRICTION"
              filterCategory="dietaryRestriction"
              selectedFilter={selectedDietaryRestriction}
              onChange={(val) => handleParamChange("dietaryRestriction", val)}
            />

            <FilterBlock
              filterName="RELIGIOUS RESTRICTION"
              filterCategory="religiousRestriction"
              selectedFilter={selectedReligiousRestriction}
              onChange={(val) => handleParamChange("religiousRestriction", val)}
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
                    {matches === 1
                      ? `${matches} match found`
                      : `${matches} matches found`}
                  </h5>
                </span>
                <RecipeTags
                  recipe={{
                    cuisineRegion: selectedCuisineRegion?.value,
                    proteinChoice: selectedProteinChoice,
                    dietaryRestriction: selectedDietaryRestriction,
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
              {allRecipes.length > 0 ? (
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
