import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import "../page-css/submit-recipe-page.css";
import dummyV1 from "../components/img/dummy/placeholder_1.jpg";
import dummyV2 from "../components/img/dummy/placeholder_2.jpg";
import SubmitButton from "../components/ui-basic-reusables/buttons/button-submit";
import { useTheme } from "../context/theme-context";
import { useState, useEffect } from "react";
import { getUserId } from "../context/decodeToken.js";
import { X } from "lucide-react";
import axios from "axios";
import {
  CUISINE_REGION_ENUM,
  PROTEIN_CHOICE_ENUM,
  DIETARY_RESTRICTION_ENUM,
  RELIGIOUS_RESTRICTION_ENUM,
} from "../data/cuisineData.js";

function SubmitRecipePage() {
  const { theme } = useTheme();

  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const userId = getUserId();
      if (!userId) return;

      try {
        const response = await axios.get(`api/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(response.data.userInfo);
        const { username, firstName, lastName } = response.data.userInfo;
        setUsername(username);
        setFullname(`${firstName} ${lastName}`);
      } catch (err) {}
    };
    getUser();
  }, []);

  const [recipeTitle, setRecipeTitle] = useState("");
  //"Add a brief description of your recipe here."
  const [image1Url, setImage1Url] = useState("");
  //const [image2Url, setImage2Url] = useState("");
  //const [image3Url, setImage3Url] = useState("");
  const uploadUrl = "https://example.com/upload";
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [cuisineRegion, setCuisineRegion] = useState(
    CUISINE_REGION_ENUM["Other"]
  );
  const [proteinChoice, setProteinChoice] = useState(
    PROTEIN_CHOICE_ENUM["None"]
  );
  const [dietaryRestriction, setDietaryRestriction] = useState(
    DIETARY_RESTRICTION_ENUM["None"]
  );
  const [religiousRestriction, setReligiousRestriction] = useState(
    RELIGIOUS_RESTRICTION_ENUM["None"]
  );
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const totalTime =
    prepTime && cookTime ? Number(prepTime) + Number(cookTime) : "0";
  const [servings, setServings] = useState("");
  const [description, setDescription] = useState("");
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const handleSubmit = async () => {
    if (
      !recipeTitle ||
      !ingredients ||
      !instructions ||
      !prepTime ||
      !cookTime ||
      !totalTime ||
      !servings ||
      !description
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const recipeData = {
      name: recipeTitle,
      prepTime,
      cookTime,
      totalTime,
      servings,
      ingredients,
      instructions,
      image1Url,
      cuisineRegion,
      proteinChoice,
      dietaryRestriction,
      religiousRestriction,
      createdAt: currentDate,
      description,
    };

    try {
      const result = await axios.post("/api/recipes", recipeData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = result.data;
      if (response.message === "Recipe successfully submitted") {
        alert("Recipe submitted successfully!");
      } else {
        alert(response.error || "Try again");
      }
    } catch (err) {
      console.error("Error during login:", err);
      if (err.response) {
        alert(err.response.data.error);
      }
    }
  };

  return (
    <div className={theme === "dark" ? "dark-mode" : ""}>
      <div className="submit-recipe-page">
        <HeaderBar />
        <h1 className="submit-recipe-title">Submit a Recipe</h1>
        <main className="submit-recipe-main-content">
          <div className="submit-recipe-major-left">
            <div className="submit-recipe-small">
              <div className="submit-recipe-span">
                <span className="bold">Recipe Title: </span>
                <span style={{ width: "0.5rem" }}></span>
                <div className="reg-input">
                  <input
                    className="submit-recipe-title-input"
                    placeholder="Title Your Recipe Here"
                    maxLength={80}
                    value={recipeTitle}
                    onChange={(e) => setRecipeTitle(e.target.value)}
                  />
                  <button
                    className="submit-button-clear"
                    onClick={() => {
                      if (recipeTitle.length !== 0) setRecipeTitle("");
                    }}
                  >
                    <X
                      color="var(--minor-accent-color-3)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Clear
                  </button>
                </div>
              </div>
              <h6 className="submit-recipe-span">
                <span className="bold">Author: </span>
                <span style={{ width: "0.5rem" }}></span>
                <span className="reg">
                  {user ? `${fullname}` : "Loading..."}
                </span>
                <div style={{ width: "0.25rem" }}></div>
                <span className="reg">
                  ({user ? `${username}` : "Loading..."})
                </span>
                <span style={{ width: "1.75rem" }}></span>
                <span className="bold">date submitting: </span>
                <span style={{ width: "0.5rem" }}></span>
                <span className="reg"> {currentDate}</span>
              </h6>
            </div>
            <div className="submit-recipe-headline">
                 <span className="bold">description: </span>
                <span className="reg">
                  <textarea
                    className="submit-recipe-description-input"
                    placeholder="Add a brief description of your recipe here."
                    rows={3}
                    maxLength={500}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                </span>
          
            </div>
            <div className="submit-recipe-image">
              <img
                src={!uploadUrl ? dummyV1 : uploadUrl}
                alt={uploadUrl}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = dummyV1;
                }}
              />
              <img src={dummyV2} alt={uploadUrl} />
              <img src={dummyV1} alt={uploadUrl} />
            </div>
            <p className="submit-recipe-image-link">
              Upload an image of your recipe here.(link, up to 3)
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage1Url(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </p>
             <div className="submit-recipe-notes">
              <div className="left">
                <div className="reg-input">
                  <span className="bold">Global Region: </span>
                  <select
                    value={cuisineRegion}
                    className="submit-recipe-tag-input"
                    onChange={(e) => setCuisineRegion(Number(e.target.value))}
                  >
                    {Object.entries(CUISINE_REGION_ENUM).map(
                      ([label, value]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                  <span style={{ width: "0.5rem" }}></span>
                  <span className="bold">Protein: </span>
                  <select
                    value={proteinChoice}
                    className="submit-recipe-tag-input"
                    onChange={(e) => setProteinChoice(Number(e.target.value))}
                  >
                    {Object.entries(PROTEIN_CHOICE_ENUM).map(
                      ([label, value]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                  <span style={{ width: "0.5rem" }}></span>
                  <span className="bold">Diet: </span>
                  <select
                    value={dietaryRestriction}
                    className="submit-recipe-tag-input"
                    onChange={(e) =>
                      setDietaryRestriction(Number(e.target.value))
                    }
                  >
                    {Object.entries(DIETARY_RESTRICTION_ENUM).map(
                      ([label, value]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                  <span style={{ width: "0.5rem" }}></span>
                  <span className="bold">Religion: </span>
                  <select
                    value={religiousRestriction}
                    className="submit-recipe-tag-input"
                    onChange={(e) =>
                      setReligiousRestriction(Number(e.target.value))
                    }
                  >
                    {Object.entries(RELIGIOUS_RESTRICTION_ENUM).map(
                      ([label, value]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                  <span style={{ width: "0.5rem" }}></span>
                </div>
              </div>
              <div className="right">
                <p>cook, prep, total time and number of servings from recipe</p>
                <div className="reg-input">
                  <span className="bold">Cook Time: </span>
                  <input
                    className="submit-recipe-time-input"
                    type="number"
                    step="10"
                    placeholder="How long to cook?"
                    min={0}
                    max={999}
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                  />
                  <button
                    className="submit-button-clear"
                    onClick={() => {
                      if (cookTime !== 0) setCookTime(0);
                    }}
                  >
                    <X
                      color="var(--minor-accent-color-3)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Clear
                  </button>
                  <span style={{ height: "0.5rem" }}></span>
                  <span className="bold">Prep Time: </span>
                  <input
                    className="submit-recipe-time-input"
                    type="number"
                    step="10"
                    placeholder="How long to prep?"
                    min={0}
                    max={999}
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                  />
                  <button
                    className="submit-button-clear"
                    onClick={() => {
                      if (prepTime !== 0) setPrepTime(0);
                    }}
                  >
                    <X
                      color="var(--minor-accent-color-3)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Clear
                  </button>
                  <span style={{ height: "0.5rem" }}></span>
                  <span className="bold">Total Time: </span>
                  <span className="reg">
                    {totalTime !== "0" ? `${totalTime}` : "0"} minutes
                  </span>
                  <span style={{ height: "0.5rem" }}></span>
                  <span className="bold">Servings: </span>
                  <input
                    className="submit-recipe-time-input"
                    type="number"
                    step="1"
                    placeholder="Number of servings"
                    min={1}
                    max={100}
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                  />
                  <button
                    className="submit-button-clear"
                    onClick={() => {
                      if (servings !== 0) setServings(0);
                    }}
                  >
                    <X
                      color="var(--minor-accent-color-3)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="submit-recipe-major-right">
    
            <div className="submit-recipe-details">
              <div className="left">
                <span className="bold">Ingredients: </span>
                <span className="reg">
                  <textarea
                    className="submit-recipe-ingredients-input"
                    placeholder="Specify ingredients"
                    rows={8}
                    maxLength={1500}
                    value={ingredients.join("\n")}
                    onChange={(e) => {
                      setIngredients(
                        e.target.value
                          .split(/[\n,]/)
                          .map((s) => s.trim())
                          .filter(Boolean)
                      );
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                </span>
                <div className="align-right">
                  <button
                    className="submit-button-clear"
                    onClick={() => {
                      if (ingredients[0].length !== 0) setIngredients([""]);
                    }}
                  >
                    <X
                      color="var(--minor-accent-color-3)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Clear
                  </button>
                </div>
              </div>
              <div className="right">
                <span className="bold">Instructions: </span>
                <span className="reg">
                  <textarea
                    className="submit-recipe-instructions-input"
                    placeholder="Specify instructions and special equipment callout"
                    rows={8}
                    maxLength={3000}
                    value={instructions.join("\n")}
                    onChange={(e) => {
                      setInstructions(
                        e.target.value
                          .split(/[\n,]/)
                          .map((s) => s.trim())
                          .filter(Boolean)
                      );
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                </span>
                <div className="align-right">
                  <button
                    className="submit-button-clear"
                    onClick={() => {
                      if (instructions[0].length !== 0) setInstructions([""]);
                    }}
                  >
                    <X
                      color="var(--minor-accent-color-3)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Clear
                  </button>
                </div>
              </div>
            </div>
            <div className="submit-recipe-author-notes">
              <h3> Author Notes</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
              <div className="submit-recipe-button-container">
                 <SubmitButton onClick={handleSubmit} aria-label="Submit" />
                    </div>
          </div>
        </main>
        <footer className="submit-recipe-footer">
          <p>Footer Content</p>
        </footer>
      </div>
    </div>
  );
}

export default SubmitRecipePage;
