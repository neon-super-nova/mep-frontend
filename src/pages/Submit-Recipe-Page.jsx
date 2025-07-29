import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import "../page-css/submit-recipe-page.css";
import dummyV1 from "../components/img/dummy/placeholder_1.jpg";
import dummyV2 from "../components/img/dummy/placeholder_2.jpg";
//import SubmitButton from "../components/ui-basic-reusables/buttons/button-submit";
import FileUploadLabel from "../components/ui-basic-reusables/labels/label-file-upload";
import { useTheme } from "../context/theme-context";
import { useState, useEffect } from "react";
import { getUserId } from "../context/decodeToken.js";
import { X } from "lucide-react";
import XFlag from "../components/ui-basic-reusables/labels/x-flag";
import axios from "axios";
import {
  CUISINE_REGION_ENUM,
  CUISINE_SUBREGION_ENUM,
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
        console.log("Fetched user info:", response.data.userInfo);
        const { username, firstName, lastName } = response.data.userInfo;
        setUsername(username);
        setFullname(`${firstName} ${lastName}`);
      } catch (err) {}
    };
    getUser();
  }, []);

  const [recipeTitle, setRecipeTitle] = useState("");
  const [image1Url, setImage1Url] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [image3Url, setImage3Url] = useState("");
  //const [imageArray, setImageArray] = useState([
   // image1Url,
    //image2Url,
   // image3Url,
  //]);
  //useEffect(() => {
    //setImageArray([image1Url, image2Url, image3Url]);
  //}, [image1Url, image2Url, image3Url]);

  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [cuisineRegion, setCuisineRegion] = useState(0);
  const cuisineRegionLabel = Object.keys(CUISINE_REGION_ENUM).find(
    (key) => CUISINE_REGION_ENUM[key] === cuisineRegion
  );
  const [cuisineSubRegion, setCuisineSubRegion] = useState("None");
  const [proteinChoice, setProteinChoice] = useState("None");
  const [dietaryRestriction, setDietaryRestriction] = useState("None");
  const [religiousRestriction, setReligiousRestriction] = useState("None");
  const [prepTime, setPrepTime] = useState(1);
  const [cookTime, setCookTime] = useState(1);
  const totalTime =
    prepTime && cookTime ? Number(prepTime) + Number(cookTime) : "0";
  const [servings, setServings] = useState(1);
  const [description, setDescription] = useState("");
  const currentDate = new Date();
  const currentDatePrint = currentDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  const [authorNotes, setAuthorNotes] = useState([]);
  const [equipment, setEquipment] = useState([]);

  const handleSubmit = async () => {
    console.log("handleSubmit triggered");

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

    if (!user) {
      alert("User not found.");
      return;
    }

    const recipeData = {
      name: recipeTitle,
      prepTime: Number(prepTime),
      cookTime: Number(cookTime),
      totalTime: Number(totalTime),
      servings: Number(servings),
      ingredients: ingredients.filter((item) => item && item.trim() !== ""),
      instructions: instructions.filter((item) => item && item.trim() !== ""),
      //imageUrls: imageArray.filter(url => url && url.trim() !== ""),
      imageUrls: ["https://images.unsplash.com/photo-1663465374413-83cba00bff6f"],
      cuisineSubRegion,
      ...(!cuisineRegionLabel
        ? { cuisineRegion }
        : { cuisineRegion: cuisineRegionLabel }),
      proteinChoice,
      dietaryRestriction,
      religiousRestriction,
      createdAt: currentDate,
      description,
      authorNotes: authorNotes.filter((item) => item && item.trim() !== ""),
      equipment: equipment.filter((item) => item && item.trim() !== ""),
    };
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      console.log("Submitting recipeData:", recipeData);
      const result = await axios.post("/api/recipes", recipeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = result.data;
      if (response.message === "Recipe successfully added") {
        alert("Recipe submitted successfully!");
      } else {
        alert(response.error || "Try again");
      }
    } catch (err) {
      console.error("Error during submission:", err);
      if (err.response) {
        alert(err.response.data.error);
      }
    }
  };

  const handleImageUpload = (file) => {
    const imageUrl = URL.createObjectURL(file);
    if (!image1Url) {
      console.log("Image 1 uploaded:", imageUrl);
      setImage1Url(imageUrl);
    } else if (!image2Url) {
      console.log("Image 2 uploaded:", imageUrl);
      setImage2Url(imageUrl);
    } else if (!image3Url) {
      console.log("Image 3 uploaded:", imageUrl);
      setImage3Url(imageUrl);
    } else {
      alert(
        "All image slots are filled. Please clear a slot before uploading a new image."
      );
    }
  };

  const clearImage = (slot) => {
    if (slot === 1) {
      setImage1Url("");
    } else if (slot === 2) {
      setImage2Url("");
    } else if (slot === 3) {
      setImage3Url("");
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
                    onChange={(e) =>
                      console.log("Recipe Title changed:", e.target.value) ||
                      setRecipeTitle(e.target.value)
                    }
                  />
                  <button
                    className="submit-button-title-clear"
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
                <span className="reg"> {currentDatePrint}</span>
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
                    console.log("Description changed:", e.target.value);
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
              <XFlag clear={() => clearImage(1)} show={!!image1Url} />
              <img
                src={!image1Url ? dummyV1 : image1Url}
                alt={image1Url}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = dummyV1;
                  console.log("Image 1 failed to load:", e.target.src);
                }}
              />
              <XFlag clear={() => clearImage(2)} show={!!image2Url} />
              <img
                src={!image2Url ? dummyV2 : image2Url}
                alt={image2Url}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = dummyV2;
                  console.log("Image 2 failed to load:", e.target.src);
                }}
              />
              <XFlag clear={() => clearImage(3)} show={!!image3Url} />
              <img
                src={!image3Url ? dummyV1 : image3Url}
                alt={image3Url}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = dummyV1;
                  console.log("Image 3 failed to load:", e.target.src);
                }}
              />
            </div>
            <p className="submit-recipe-image-link">
              Upload an image of your recipe here.(link, up to 3){" "}
            </p>
            <FileUploadLabel
              label="Choose Image"
              className="submit-upload"
              onFileSelect={(file) => handleImageUpload(file)}
            />

            <div className="submit-recipe-notes">
              <div className="left">
                <div className="reg-input">
                  <span className="submit-recipe-tag-bold">
                    Global Region:{" "}
                  </span>

                  <select
                    value={cuisineRegion}
                    className="submit-recipe-tag-input"
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      console.log("Cuisine Region changed:", val);
                      setCuisineRegion(val);
                    }}
                  >
                    {Object.entries(CUISINE_REGION_ENUM).map(
                      ([label, value]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <span style={{ width: "0.5rem" }}></span>
                <div className="reg-input">
                  <span className="submit-recipe-tag-bold">Sub-Region: </span>
                  <select
                    value={cuisineSubRegion}
                    className="submit-recipe-tag-input"
                    onChange={(e) => {
                      console.log("Sub-Region changed:", e.target.value);
                      setCuisineSubRegion(e.target.value);
                    }}
                  >
                    {CUISINE_SUBREGION_ENUM[cuisineRegion]?.map(
                      (subregion, index) => (
                        <option key={index} value={subregion}>
                          {subregion}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <span style={{ width: "0.5rem" }}></span>
                <div className="reg-input">
                  <span className="submit-recipe-tag-bold">Protein: </span>
                  <select
                    value={proteinChoice}
                    className="submit-recipe-tag-input"
                    onChange={(e) => {
                      console.log("Protein choice changed:", e.target.value);
                      setProteinChoice(e.target.value);
                    }}
                  >
                    {Object.entries(PROTEIN_CHOICE_ENUM).map(([label]) => (
                      <option key={label} value={label}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <span style={{ width: "0.5rem" }}></span>
                <div className="reg-input">
                  <span className="submit-recipe-tag-bold">Diet: </span>
                  <select
                    value={dietaryRestriction}
                    className="submit-recipe-tag-input"
                    onChange={(e) => {
                      console.log(
                        "Dietary restriction changed:",
                        e.target.value
                      );
                      setDietaryRestriction(e.target.value);
                    }}
                  >
                    {Object.entries(DIETARY_RESTRICTION_ENUM).map(([label]) => (
                      <option key={label} value={label}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <span style={{ width: "0.5rem" }}></span>
                <div className="reg-input">
                  <span className="submit-recipe-tag-bold">Religion: </span>
                  <select
                    value={religiousRestriction}
                    className="submit-recipe-tag-input"
                    onChange={(e) => {
                      console.log(
                        "Religious restriction changed:",
                        e.target.value
                      );
                      setReligiousRestriction(e.target.value);
                    }}
                  >
                    {Object.entries(RELIGIOUS_RESTRICTION_ENUM).map(
                      ([label]) => (
                        <option key={label} value={label}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div className="right">
                <div className="reg-input">
                  <span className="bold">Cook Time: </span>
                  <input
                    className="submit-recipe-time-input"
                    type="number"
                    step="10"
                    placeholder="#"
                    min={0}
                    max={999}
                    value={cookTime}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      console.log("Cook time changed:", val);
                      setCookTime(val < 1 ? 1 : val);
                    }}
                  />
                  <span className="bold">minutes</span>
                  <button
                    className="submit-time-button-clear"
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
                </div>
                <span style={{ height: "0.5rem" }}></span>
                <div className="reg-input">
                  <span className="bold">Prep Time: </span>
                  <input
                    className="submit-recipe-time-input"
                    type="number"
                    step="10"
                    placeholder="#"
                    min={0}
                    max={999}
                    value={prepTime}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      console.log("Prep time changed:", val);
                      setPrepTime(val < 1 ? 1 : val);
                    }}
                  />
                  <span className="bold">minutes</span>
                  <button
                    className="submit-time-button-clear"
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
                </div>
                <span style={{ height: "0.5rem" }}></span>
                <div className="reg-input">
                  <span className="bold">Total Time: </span>
                  <span className="reg-total">
                    {totalTime !== "0" ? `${totalTime}` : "0"} minutes
                  </span>
                </div>
                <span style={{ height: "0.5rem" }}></span>
                <div className="reg-input">
                  <span className="bold">Servings: </span>
                  <input
                    className="submit-recipe-time-input"
                    type="number"
                    step="1"
                    placeholder="#"
                    min={1}
                    max={100}
                    value={servings}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      console.log("Servings changed:", val);
                      setServings(val < 1 ? 1 : val);
                    }}
                  />
                  <button
                    className="submit-time-button-clear"
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
            <div className="submit-recipe-special-equipment">
              <span className="bold">Special Equipment (Optional) </span>
              <span className="reg">
                <textarea
                  className="submit-recipe-special-equipment-input"
                  placeholder="Add any special equipment needed for this recipe."
                  rows={2}
                  maxLength={500}
                  value={equipment.join(",")}
                  onChange={(e) => {
                    console.log("Special equipment changed:", e.target.value);
                    setEquipment(e.target.value.split(","));
                  }}
                />
              </span>
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
                    value={ingredients.join(",")}
                    onChange={(e) => {
                      console.log("Ingredients changed:", e.target.value);
                      setIngredients(e.target.value.split(/[\n,]+/));
                    }}
                  />
                </span>
                <div className="align-right">
                  <button
                    className="submit-button-clear"
                    onClick={() => {
                      console.log("Clear ingredients");
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
                    value={instructions.join(",")}
                    onChange={(e) => {
                      console.log("Instructions changed:", e.target.value);
                      setInstructions(e.target.value.split(/[\n,]+/));
                    }}
                  />
                </span>
                <div className="align-right">
                  <button
                    className="submit-button-clear"
                    onClick={() => {
                      console.log("Clear instructions");
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
              <span className="bold">Author Notes (Optional) </span>
              <span className="reg">
                <textarea
                  className="submit-recipe-author-notes-input"
                  placeholder="Add any final details."
                  rows={2}
                  maxLength={500}
                  value={authorNotes.join(",")}
                  onChange={(e) => {
                    console.log("Author notes changed:", e.target.value);
                    setAuthorNotes(e.target.value.split(/[\n,]+/));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
              </span>
            </div>
            <div className="submit-recipe-button-container">
              <button
                onClick={handleSubmit}
                aria-label="Submit"
                className="submit-upload-button"
              >
                Submit
              </button>
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
