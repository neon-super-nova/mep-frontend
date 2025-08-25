import "../page-css/home-page.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "../components/ui-basic-reusables/other/search-bar";
import BrowseBlocks from "../components/ui-basic-reusables/other/browse-blocks";
import TrendingRecipe from "../components/ui-basic-reusables/other/trending-recipe";
import TopRatedRecipe from "../components/ui-basic-reusables/other/top-rated-recipe";
import axios from "axios";
import { getUserId } from "../context/decodeToken.js";
import { useTheme } from "../context/theme-context";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import placeholder1 from "../components/img/dummy/placeholder_1.jpg";

function HomePage() {
  const { theme } = useTheme();

  const navigate = useNavigate();

  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [topRatedRecipes, setTopRatedRecipes] = useState([]);

  const userId = getUserId();
  if (userId === undefined) {
    navigate("/");
  }

  useEffect(() => {
    async function fetchTrendingRecipes() {
      try {
        const response = await axios.get("/api/recipes/trending");
        setTrendingRecipes(response.data.trendingRecipes);
      } catch (err) {
        console.error("Error fetching all recipes:", err);
        setTrendingRecipes([]);
      }
    }
    fetchTrendingRecipes();
  }, []);

  useEffect(() => {
    async function fetchTopRatedRecipes() {
      try {
        const response = await axios.get("/api/recipes/top-rated");
        setTopRatedRecipes(response.data.topRatedRecipes);
      } catch (err) {
        console.error("Error fetching all recipes:", err);
        setTopRatedRecipes([]);
      }
    }
    fetchTopRatedRecipes();
  }, []);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="home-page">
        {/* Header */}
        <HeaderBar />

        {/* Main Content */}
        <main className="home-page-main-content">
          {/* Left Panel */}
          <div className="home-page-left-panel">
            <h2 className="home-page-left-panel-title">RECIPE LOOKUP</h2>
            {/* Search bar */}
            <div className="home-page-left-panel-search-div">
              <p className="home-page-left-panel-subtitles">SEARCH</p>
              <SearchBar />
              {/* Advanced bar */}
              <div className="home-page-left-panel-advanced-search">
                <p className="home-page-left-panel-advanced-search-reg">
                  or use
                </p>
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
                  {
                    label: "Latin-American",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-latin-american-orange.png"
                        : "/img/home-blocks-green/region-latin-american-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?cuisineRegion=latin american");
                    },
                  },
                  {
                    label: "Caribbean",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-caribbean-orange.png"
                        : "/img/home-blocks-green/region-caribbean-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?cuisineRegion=caribbean");
                    },
                  },
                  {
                    label: "North American",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-north-american-orange.png"
                        : "/img/home-blocks-green/region-north-american-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?cuisineRegion=north american");
                    },
                  },
                  {
                    label: "Middle Eastern",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-middle-eastern-orange.png"
                        : "/img/home-blocks-green/region-middle-eastern-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?cuisineRegion=middle eastern");
                    },
                  },
                  {
                    label: "South Asian",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-south-asian-orange.png"
                        : "/img/home-blocks-green/region-south-asian-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?cuisineRegion=south asian");
                    },
                  },
                  {
                    label: "East Asian",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-east-asian-orange.png"
                        : "/img/home-blocks-green/region-east-asian-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?cuisineRegion=east asian");
                    },
                  },
                  {
                    label: "Southeast Asian",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-south-east-asian-orange.png"
                        : "/img/home-blocks-green/region-south-east-asian-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?cuisineRegion=southeast asian");
                    },
                  },
                  {
                    label: "African",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-african-orange.png"
                        : "/img/home-blocks-green/region-african-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?cuisineRegion=african");
                    },
                  },
                  {
                    label: "European",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-european-orange.png"
                        : "/img/home-blocks-green/region-european-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?cuisineRegion=european");
                    },
                  },
                  {
                    label: "Hawaiian/Pacific Islander",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-hawaiian-pacific-islands-orange.png"
                        : "/img/home-blocks-green/region-hawaiian-pacific-islands-green.png",
                    onClick: () => {
                      navigate(
                        "/advancedsearch?cuisineRegion=hawaiian pacific islander"
                      );
                    },
                  },
                ]}
              />
              <BrowseBlocks
                subheading="By Protein Choice"
                blocks={[
                  {
                    label: "Chicken",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-chicken-orange.png"
                        : "/img/home-blocks-green/protein-chicken-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?proteinChoice=chicken");
                    },
                  },
                  {
                    label: "Beef",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-beef-orange.png"
                        : "/img/home-blocks-green/protein-beef-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?proteinChoice=beef");
                    },
                  },
                  {
                    label: "Pork",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-pork-orange.png"
                        : "/img/home-blocks-green/protein-pork-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?proteinChoice=pork");
                    },
                  },
                  {
                    label: "Lamb",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-lamb-orange.png"
                        : "/img/home-blocks-green/protein-lamb-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?proteinChoice=lamb");
                    },
                  },
                  {
                    label: "Fish",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-fish-orange.png"
                        : "/img/home-blocks-green/protein-fish-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?proteinChoice=fish");
                    },
                  },
                  {
                    label: "Shellfish",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-shellfish-orange.png"
                        : "/img/home-blocks-green/protein-shellfish-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?proteinChoice=fish");
                    },
                  },
                  {
                    label: "Eggs",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-egg-orange.png"
                        : "/img/home-blocks-green/protein-egg-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?proteinChoice=eggs");
                    },
                  },
                  {
                    label: "Plant-based",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-plant-based-orange.png"
                        : "/img/home-blocks-green/protein-plant-based-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?proteinChoice=plant-based");
                    },
                  },
                ]}
              />
              <BrowseBlocks
                subheading="By Diet Restriction"
                blocks={[
                  {
                    label: "Gluten free",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-no-gluten-orange.png"
                        : "/img/home-blocks-green/diet-no-gluten-green.png",
                    onClick: () => {
                      navigate(
                        "/advancedsearch?dietaryRestriction=gluten free"
                      );
                    },
                  },
                  {
                    label: "Dairy free",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-no-dairy-orange.png"
                        : "/img/home-blocks-green/diet-no-dairy-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?dietaryRestriction=dairy free");
                    },
                  },
                  {
                    label: "Nut free",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-no-nuts-orange.png"
                        : "/img/home-blocks-green/diet-no-nuts-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?dietaryRestriction=nut free");
                    },
                  },
                  {
                    label: "Shellfish free",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-no-shellfish-orange.png"
                        : "/img/home-blocks-green/diet-no-shellfish-green.png",
                    onClick: () => {
                      navigate(
                        "/advancedsearch?dietaryRestriction=shellfish free"
                      );
                    },
                  },
                  {
                    label: "Low carb",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-low-carb-orange.png"
                        : "/img/home-blocks-green/diet-low-carb-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?dietaryRestriction=low carb");
                    },
                  },
                  {
                    label: "Paleo",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-paleo-orange.png"
                        : "/img/home-blocks-green/diet-paleo-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?dietaryRestriction=paleo");
                    },
                  },
                  {
                    label: "Keto",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-keto-orange.png"
                        : "/img/home-blocks-green/diet-keto-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?dietaryRestriction=keto");
                    },
                  },
                  {
                    label: "Vegan",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-vegan-1-orange.png"
                        : "/img/home-blocks-green/diet-vegan-1-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?dietaryRestriction=vegan");
                    },
                  },
                  {
                    label: "Vegetarian",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-vegetarian-orange.png"
                        : "/img/home-blocks-green/diet-vegetarian-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?dietaryRestriction=vegetarian");
                    },
                  },
                ]}
              />
              <BrowseBlocks
                subheading="By Religious Accommodation"
                blocks={[
                  {
                    label: "Kosher",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/religion-kosher-orange.png"
                        : "/img/home-blocks-green/religion-kosher-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?religiousRestriction=kosher");
                    },
                  },
                  {
                    label: "Kosher Parve",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/religion-kosher-parve-orange.png"
                        : "/img/home-blocks-green/religion-kosher-parve-green.png",
                    onClick: () => {
                      navigate(
                        "/advancedsearch?religiousRestriction=kosher parve"
                      );
                    },
                  },
                  {
                    label: "Halal",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/religion-halal-orange.png"
                        : "/img/home-blocks-green/religion-halal-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?religiousRestriction=halal");
                    },
                  },
                  {
                    label: "Hindu",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/religion-hindu-orange.png"
                        : "/img/home-blocks-green/religion-hindu-green.png",
                    onClick: () => {
                      navigate("/advancedsearch?religiousRestriction=hindu");
                    },
                  },
                ]}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="home-page-right-panel">
            <h2 className="home-page-right-panel-title">TRENDING</h2>
            {trendingRecipes.length > 0 ? (
              trendingRecipes.map((trendingRecipe, idx) => {
                return (
                  <TrendingRecipe
                    key={trendingRecipe._id || idx}
                    recipeId={trendingRecipe._id}
                    recipeName={trendingRecipe.name}
                    recipeImage={
                      trendingRecipe.imageUrls.length > 0
                        ? trendingRecipe.imageUrls[0]
                        : placeholder1
                    }
                    recipeDescription={trendingRecipe.description}
                  />
                );
              })
            ) : (
              <p>Loading ...</p>
            )}

            <h2 className="home-page-right-panel-title">TOP RATED</h2>
            {topRatedRecipes.length > 0 ? (
              topRatedRecipes.map((topRatedRecipe, idx) => {
                return (
                  <TopRatedRecipe
                    key={topRatedRecipe.recipeId || idx}
                    recipeId={topRatedRecipe.id}
                    recipeImage={
                      topRatedRecipe.imageUrls.length > 0
                        ? topRatedRecipe.imageUrls[0]
                        : placeholder1
                    }
                    recipeName={topRatedRecipe.name}
                    recipeRating={topRatedRecipe.averageRating}
                    recipeDescription={topRatedRecipe.description}
                    cuisineRegion={topRatedRecipe.cuisineRegion}
                    dietaryRestriction={topRatedRecipe.dietaryRestriction}
                    proteinChoice={topRatedRecipe.proteinChoice}
                    religiousRestriction={topRatedRecipe.religiousRestriction}
                  />
                );
              })
            ) : (
              <div>
                <p>Loading ...</p>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="home-page-footer">
          <p>Footer Content</p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
