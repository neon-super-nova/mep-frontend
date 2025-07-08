import "../page-css/home-page.css";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "../components/ui-basic-reusables/other/search-bar";
import BrowseBlocks from "../components/ui-basic-reusables/other/browse-blocks";
import TrendingRecipe from "../components/ui-basic-reusables/other/trending-recipe";
import TopRatedRecipe from "../components/ui-basic-reusables/other/top-rated-recipe";
import axios from "axios";
// import bananaBread from "../components/img/dummy/bananabread.jpg";
// import macncheese from "../components/img/dummy/macncheese.jpg";
import { useTheme } from "../context/theme-context";
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";

function HomePage() {
  const { theme } = useTheme();
  //const { recipeId } = useParams();

  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [topRatedRecipes, setTopRatedRecipes] = useState([]);

  //const [user, setUser] = useState(null);

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
                    onClick: () => {},
                  },
                  {
                    label: "Caribbean",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-caribbean-orange.png"
                        : "/img/home-blocks-green/region-caribbean-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "North American",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-north-american-orange.png"
                        : "/img/home-blocks-green/region-north-american-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Middle Eastern",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-middle-eastern-orange.png"
                        : "/img/home-blocks-green/region-middle-eastern-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "South Asian",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-south-asian-orange.png"
                        : "/img/home-blocks-green/region-south-asian-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "East Asian",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-east-asian-orange.png"
                        : "/img/home-blocks-green/region-east-asian-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Southeast Asian",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-south-east-asian-orange.png"
                        : "/img/home-blocks-green/region-south-east-asian-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "African",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-african-orange.png"
                        : "/img/home-blocks-green/region-african-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "European",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-european-orange.png"
                        : "/img/home-blocks-green/region-european-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Hawaiian/Pacific Islander",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/region-hawaiian-pacific-islands-orange.png"
                        : "/img/home-blocks-green/region-hawaiian-pacific-islands-green.png",
                    onClick: () => {},
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
                    onClick: () => {},
                  },
                  {
                    label: "Beef",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-beef-orange.png"
                        : "/img/home-blocks-green/protein-beef-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Pork",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-pork-orange.png"
                        : "/img/home-blocks-green/protein-pork-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Lamb",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-lamb-orange.png"
                        : "/img/home-blocks-green/protein-lamb-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Fish",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-fish-orange.png"
                        : "/img/home-blocks-green/protein-fish-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Shellfish",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-shellfish-orange.png"
                        : "/img/home-blocks-green/protein-shellfish-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Eggs",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-egg-orange.png"
                        : "/img/home-blocks-green/protein-egg-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Plant-based",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/protein-plant-based-orange.png"
                        : "/img/home-blocks-green/protein-plant-based-green.png",
                    onClick: () => {},
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
                    onClick: () => {},
                  },
                  {
                    label: "Dairy free",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-no-dairy-orange.png"
                        : "/img/home-blocks-green/diet-no-dairy-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Nut free",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-no-nuts-orange.png"
                        : "/img/home-blocks-green/diet-no-nuts-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Shellfish free",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-no-shellfish-orange.png"
                        : "/img/home-blocks-green/diet-no-shellfish-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Low carb",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-low-carb-orange.png"
                        : "/img/home-blocks-green/diet-low-carb-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Paleo",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-paleo-orange.png"
                        : "/img/home-blocks-green/diet-paleo-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Keto",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-keto-orange.png"
                        : "/img/home-blocks-green/diet-keto-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Vegan",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-vegan-1-orange.png"
                        : "/img/home-blocks-green/diet-vegan-1-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Vegetarian",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/diet-vegetarian-orange.png"
                        : "/img/home-blocks-green/diet-vegetarian-green.png",
                    onClick: () => {},
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
                    onClick: () => {},
                  },
                  {
                    label: "Kosher Parve",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/religion-kosher-parve-orange.png"
                        : "/img/home-blocks-green/religion-kosher-parve-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Halal",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/religion-halal-orange.png"
                        : "/img/home-blocks-green/religion-halal-green.png",
                    onClick: () => {},
                  },
                  {
                    label: "Hindu",
                    image:
                      theme === "dark"
                        ? "/img/home-blocks-orange/religion-hindu-orange.png"
                        : "/img/home-blocks-green/religion-hindu-green.png",
                    onClick: () => {},
                  },
                ]}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="home-page-right-panel">
            <h2 className="home-page-right-panel-title">TRENDING</h2>
            {trendingRecipes.length > 0 ? (
              trendingRecipes.map((trendingRecipe) => {
                return (
                  <TrendingRecipe
                    recipeId={trendingRecipe._id}
                    recipeName={trendingRecipe.name}
                    recipeImage={trendingRecipe.imageUrl}
                    recipeDescription={trendingRecipe.description}
                  />
                );
              })
            ) : (
              <p>Loading ...</p>
            )}

            <h2 className="home-page-right-panel-title">TOP RATED</h2>
            {topRatedRecipes.length > 0 ? (
              topRatedRecipes.map((topRatedRecipe) => {
                return (
                  <TopRatedRecipe
                    recipeId={topRatedRecipe.id}
                    recipeImage={topRatedRecipe.imageUrl}
                    recipeName={topRatedRecipe.name}
                    recipeRating={topRatedRecipe.rating}
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
                {/* <TopRatedRecipe
                  recipeImage={bananaBread}
                  recipeName="Banana Bread"
                  recipeRating={4.8}
                  recipeDescription="A moist, delicious banana bread recipe perfect for any time of day."
                  cuisineRegion="North American"
                  dietaryRestriction="Dairy-Free"
                  proteinChoice="None"
                  religiousRestriction="Kosher"
                />
                <TopRatedRecipe
                  recipeImage={macncheese}
                  recipeName="Mac & Cheese Supreme"
                  recipeRating={3.8}
                  recipeDescription="Creamy, cheesy, and oven-baked to perfection. This is a comfort food classic with a gourmet twist."
                  cuisineRegion="North American"
                  dietaryRestriction="Vegetarian"
                  proteinChoice="Eggs"
                  religiousRestriction="None"
                /> */}
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
