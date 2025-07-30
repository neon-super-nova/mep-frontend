/* eslint-disable no-unused-vars */
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import "../page-css/submit-recipe-page.css";
import dummyV1 from "../components/img/dummy/placeholder_1.jpg";
import dummyV2 from "../components/img/dummy/placeholder_2.jpg";
//import SubmitButton from "../components/ui-basic-reusables/buttons/button-submit";
import FileUploadLabel from "../components/ui-basic-reusables/labels/label-file-upload";
import { useTheme } from "../context/theme-context";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../context/decodeToken.js";
import { X } from "lucide-react";
import XFlag from "../components/ui-basic-reusables/labels/x-flag";
import axios from "axios";
import { cuisineData } from "../data/cuisineData.js";

function SubmitRecipePage() {
  const { theme } = useTheme();

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");

  const navigate = useNavigate();

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

  // defining formData object to append all entries for recipe doc
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    prepTimeStr: "",
    cookTimeStr: "",
    servingsStr: "",
    cuisineRegion: "",
    cuisineSubregion: "",
    proteinChoice: "",
    dietaryRestriction: "",
    religiousRestriction: "",
  });

  const [cuisineRegion, setCuisineRegion] = useState("");
  const [cuisineSubRegion, setCuisineSubRegion] = useState("");
  const [proteinChoice, setProteinChoice] = useState("");
  const [religiousRestriction, setReligiousRestriction] = useState("");
  const [dietaryRestriction, setDietaryRestriction] = useState("");

  // ingredients, instructions, authorNotes, equipment, imageUrls
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");
  const [authorNotesText, setAuthorNotesText] = useState("");
  const [equipmentText, setEquipmentText] = useState("");

  // setting the aid functions to populate arrays

  const processMultilineInput = (input) => {
    if (typeof input !== "string") {
      return [];
    }
    return input
      .split(/[\n,]+/) // split by newlines or commas
      .map((line) => line.trim()) // trim whitespace
      .filter((line) => line.length);
  };

  //images
  const [images, setImages] = useState([null, null, null]); //files for backend
  const [imagePreview, setImagesPreview] = useState(["", "", ""]); //images for display

  const handleImageUpload = (file) => {
    const previewUrl = URL.createObjectURL(file);
    const firstAvailableIdx = images.findIndex((url) => !url);
    if (firstAvailableIdx !== -1) {
      // save images as file for backend and for preview
      setImages((prev) => {
        const array = [...prev];
        array[firstAvailableIdx] = file;
        return array;
      });
      setImagesPreview((prev) => {
        const array = [...prev];
        array[firstAvailableIdx] = previewUrl;
        return array;
      });
    } else {
      alert(
        "All image slots are filled. Please clear a slot before uploading a new image."
      );
    }
  };

  const clearImage = (slot) => {
    const idx = slot - 1; // slots are 1-based
    setImages((prev) => {
      const array = [...prev];
      array[idx] = null;
      return array;
    });
    setImagesPreview((prev) => {
      const array = [...prev];
      array[idx] = "";
      return array;
    });
  };

  // putting it all together and sending it to the backend aka big boy
  const handleSubmit = async () => {
    console.log("handleSubmit triggered");

    const ingredientsArray = processMultilineInput(ingredientsText);
    const instructionsArray = processMultilineInput(instructionsText);
    const equipmentArray = processMultilineInput(equipmentText);
    const authorNotesArray = processMultilineInput(authorNotesText);
    const cookTime = Number(formData.cookTimeStr);
    const prepTime = Number(formData.prepTimeStr);
    const servings = Number(formData.servingsStr);

    if (
      !formData.name ||
      !formData.description ||
      !ingredientsArray.length ||
      !instructionsArray.length
    ) {
      alert("Please fill out all fields.");
      return;
    }

    if (cookTime <= 0 || prepTime <= 0 || servings <= 0) {
      alert(
        "Cook time, prep time and servings must be valid numbers greater than 0."
      );
      return;
    }

    if (!user) {
      alert("User not found.");
      return;
    }

    const bigBoy = new FormData();

    bigBoy.append("name", formData.name);
    bigBoy.append("description", formData.description);
    bigBoy.append("prepTime", prepTime);
    bigBoy.append("cookTime", cookTime);
    bigBoy.append("servings", servings);

    // enums
    bigBoy.append("cuisineRegion", cuisineRegion);
    bigBoy.append("cuisineSubregion", cuisineSubRegion);
    bigBoy.append("proteinChoice", proteinChoice);
    bigBoy.append("dietaryRestriction", dietaryRestriction);
    bigBoy.append("religiousRestriction", religiousRestriction);

    // stringified arrays
    bigBoy.append("ingredients", JSON.stringify(ingredientsArray));
    bigBoy.append("instructions", JSON.stringify(instructionsArray));
    bigBoy.append("equipment", JSON.stringify(equipmentArray));
    bigBoy.append("authorNotes", JSON.stringify(authorNotesArray));

    // images
    images.forEach((file) => {
      if (file) bigBoy.append("images", file);
    });

    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const result = await axios.post("/api/recipes", bigBoy, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = result.data;
      const recipeId = result.data.recipeId;
      console.log(recipeId);
      if (response.message === "Recipe successfully added") {
        alert("Recipe submitted successfully!");
        navigate(`/recipe/${recipeId}`);
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
                    value={formData.name}
                    onChange={(e) =>
                      console.log("Recipe Title changed:", e.target.value) ||
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <button
                    className="submit-button-title-clear"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData((prev) => ({
                        ...prev,
                        name: "",
                      }));
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
                {/* <span className="bold">date submitting: </span>
                <span style={{ width: "0.5rem" }}></span> */}
                {/* <span className="reg"> {currentDatePrint}</span> */}
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
                  value={formData.description}
                  onChange={(e) => {
                    console.log("Description changed:", e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
              </span>
            </div>
            {/* images */}
            <div className="submit-recipe-image">
              <XFlag clear={() => clearImage(1)} show={!!imagePreview[0]} />
              <img
                src={!imagePreview[0] ? dummyV1 : imagePreview[0]}
                alt={imagePreview[0]}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = dummyV1;
                  console.log("Image 1 failed to load:", e.target.src);
                }}
              />
              <XFlag clear={() => clearImage(2)} show={!!imagePreview[1]} />
              <img
                src={!imagePreview[1] ? dummyV2 : imagePreview[1]}
                alt={imagePreview[1]}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = dummyV2;
                  console.log("Image 2 failed to load:", e.target.src);
                }}
              />
              <XFlag clear={() => clearImage(3)} show={!!imagePreview[2]} />
              <img
                src={!imagePreview[2] ? dummyV1 : imagePreview[2]}
                alt={imagePreview[2]}
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
            {/* end of images */}

            <div className="submit-recipe-notes">
              <div className="left">
                <div className="reg-input">
                  <span className="submit-recipe-tag-bold">
                    Global Region:{" "}
                  </span>

                  <select
                    className="submit-recipe-tag-input"
                    value={cuisineRegion}
                    onChange={(e) => {
                      const region = e.target.value;
                      console.log("cuisine region is set to " + region);
                      setCuisineRegion(e.target.value);
                    }}
                  >
                    <option value="">None</option>
                    {Object.entries(cuisineData.cuisineRegion).map(
                      ([label]) => (
                        <option key={label} value={label}>
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
                      const subregion = e.target.value;
                      console.log("cuisine sub-region is set to " + subregion);
                      setCuisineSubRegion(subregion);
                    }}
                  >
                    <option value="">None</option>
                    {cuisineData.cuisineRegion[cuisineRegion]?.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <span style={{ width: "0.5rem" }}></span>
                <div className="reg-input">
                  <span className="submit-recipe-tag-bold">Protein: </span>
                  <select
                    value={proteinChoice}
                    className="submit-recipe-tag-input"
                    onChange={(e) => {
                      const protein = e.target.value;
                      console.log("Protein choice changed:", protein);
                      setProteinChoice(protein);
                    }}
                  >
                    <option value="">None</option>
                    {cuisineData.proteinChoice.map((item) => (
                      <option key={item} value={item}>
                        {item}
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
                      const diet = e.target.value;
                      console.log("Dietary restriction changed:", diet);
                      setDietaryRestriction(diet);
                    }}
                  >
                    <option value="">None</option>
                    {cuisineData.dietaryRestriction.map((item) => (
                      <option key={item} value={item}>
                        {item}
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
                      const religion = e.target.value;
                      console.log("Religious restriction changed:", religion);
                      setReligiousRestriction(religion);
                    }}
                  >
                    <option value="">None</option>
                    {cuisineData.religiousRestriction.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
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
                    value={formData.cookTimeStr ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      console.log("cook time is set to " + val);
                      if (val === "") {
                        setFormData((prev) => ({
                          ...prev,
                          cookTimeStr: "",
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          cookTimeStr: val,
                        }));
                      }
                    }}
                  />
                  <span className="bold">minutes</span>
                  <button
                    className="submit-time-button-clear"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData((prev) => ({
                        ...prev,
                        cookTimeStr: "",
                      }));
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
                    value={formData.prepTimeStr ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      console.log("prep time is set to " + val);
                      if (val === "") {
                        setFormData((prev) => ({
                          ...prev,
                          prepTimeStr: "",
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          prepTimeStr: val,
                        }));
                      }
                    }}
                  />
                  <span className="bold">minutes</span>
                  <button
                    className="submit-time-button-clear"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData((prev) => ({
                        ...prev,
                        prepTimeStr: "",
                      }));
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
                  {/* <span className="bold">Total Time: </span>
                  <span className="reg-total">
                    {Number(formData.prepTime + formData.cookTime)} minutes
                  </span> */}
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
                    value={formData.servingsStr ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      console.log("servings is set to " + val);
                      if (val === "") {
                        setFormData((prev) => ({
                          ...prev,
                          servingsStr: "",
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          servingsStr: val,
                        }));
                      }
                    }}
                  />
                  <button
                    className="submit-time-button-clear"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData((prev) => ({
                        ...prev,
                        servingsStr: "",
                      }));
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
                  value={equipmentText}
                  onChange={(e) => {
                    setEquipmentText(e.target.value);
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
                    value={ingredientsText}
                    onChange={(e) => {
                      setIngredientsText(e.target.value);
                    }}
                  />
                </span>
                <div className="align-right">
                  <button
                    className="submit-button-clear"
                    onClick={() => {
                      console.log("Clear ingredients");
                      setIngredientsText("");
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
                    value={instructionsText}
                    onChange={(e) => {
                      setInstructionsText(e.target.value);
                    }}
                  />
                </span>
                <div className="align-right">
                  <button
                    className="submit-button-clear"
                    onClick={() => {
                      console.log("Clear instructions");
                      setInstructionsText("");
                      setFormData((prev) => ({ ...prev, instructions: [] }));
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
                  value={authorNotesText}
                  onChange={(e) => {
                    setAuthorNotesText(e.target.value);
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
