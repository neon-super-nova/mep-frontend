/* eslint-disable no-unused-vars */
import HeaderBar from "../components/ui-basic-reusables/page-elements/header-bar";
import "../page-css/submit-recipe-page.css";
import dummyV1 from "../components/img/dummy/placeholder_1.jpg";
import dummyV2 from "../components/img/dummy/placeholder_2.jpg";
//import SubmitButton from "../components/ui-basic-reusables/buttons/button-submit";
import FileUploadLabel from "../components/ui-basic-reusables/labels/label-file-upload";
import { useTheme } from "../context/theme-context";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../context/decodeToken.js";
import { X } from "lucide-react";
import XFlag from "../components/ui-basic-reusables/labels/x-flag";
import axios from "axios";
import { cuisineData } from "../data/cuisineData.js";

function ModifyRecipePage() {
  const { recipeId } = useParams();
  const { theme } = useTheme();

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");

  const navigate = useNavigate();
  const userId = getUserId();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`, {
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
    if (userId) {
      getUser();
    }
  }, [userId]);

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipeInfo() {
      try {
        const response = await axios.get(`/api/recipes/${recipeId}`);
        const recipeData = response.data.recipe;
        setRecipe(recipeData);
        if (recipeData && recipeData.userId) {
          const userResponse = await axios.get(
            `/api/users/${recipeData.userId}`
          );
          setUser(userResponse.data.userInfo);
        }
      } catch (err) {
        setRecipe(null);
        setUser(null);
      }
    }
    fetchRecipeInfo();
  }, [recipeId, userId]);

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
    ingredients: "",
    instructions: "",
    authorNotes: "",
    equipment: "",
    imageUrls: [],
  });

  // When recipe loads, update formData
  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name || "",
        description: recipe.description || "",
        prepTimeStr: recipe.prepTime ? String(recipe.prepTime) : "",
        cookTimeStr: recipe.cookTime ? String(recipe.cookTime) : "",
        servingsStr: recipe.servings ? String(recipe.servings) : "",
        cuisineRegion: recipe.cuisineRegion || "",
        cuisineSubregion: recipe.cuisineSubregion || "",
        proteinChoice: recipe.proteinChoice || "",
        dietaryRestriction: recipe.dietaryRestriction || "",
        religiousRestriction: recipe.religiousRestriction || "",
        ingredients: recipe.ingredients?.join("\n") || "",
        instructions: recipe.instructions?.join("\n") || "",
        authorNotes: recipe.authorNotes || "",
        equipment: recipe.equipment?.join("\n") || "",
        imageUrls: recipe.imageUrls || [],
      });
      setImageUrls(recipe.imageUrls || []);
      setImagesPreview(recipe.imageUrls || []);
    }
  }, [recipe]);

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

  const MAX_IMAGES = 3;

  const [imageUrls, setImageUrls] = useState(Array(MAX_IMAGES).fill(null)); // files for backend

  const [imagePreview, setImagesPreview] = useState(() => {
    // Use recipe?.imageUrls if available, else fill with nulls
    const urls = recipe?.imageUrls || [];
    return Array.from({ length: MAX_IMAGES }, (_, i) => urls[i] || null);
  });

  const handleImageUpload = (file) => {
    const previewUrl = URL.createObjectURL(file);
    const firstAvailableIdx = imageUrls.findIndex((url) => !url);
    if (firstAvailableIdx !== -1) {
      // save images as file for backend and for preview
      setImageUrls((prev) => {
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
    const index = slot - 1; // slots are 1-based
    setImageUrls((prev) => {
      const array = [...prev];
      array[index] = null;
      return array;
    });
    setImagesPreview((prev) => {
      const array = [...prev];
      array[index] = "";
      return array;
    });
  };

  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    if (recipe) {
      setOriginalData({
        name: recipe.name || "",
        description: recipe.description || "",
        prepTimeStr: recipe.prepTime ? String(recipe.prepTime) : "",
        cookTimeStr: recipe.cookTime ? String(recipe.cookTime) : "",
        servingsStr: recipe.servings ? String(recipe.servings) : "",
        cuisineRegion: recipe.cuisineRegion || "",
        cuisineSubregion: recipe.cuisineSubregion || "",
        proteinChoice: recipe.proteinChoice || "",
        dietaryRestriction: recipe.dietaryRestriction || "",
        religiousRestriction: recipe.religiousRestriction || "",
        ingredients: recipe.ingredients?.join("\n") || "",
        instructions: recipe.instructions?.join("\n") || "",
        authorNotes: recipe.authorNotes || "",
        equipment: recipe.equipment?.join("\n") || "",
      });
    }
  }, [recipe]);

  function isFormChanged(current, original) {
    if (!original) return true;
    return Object.keys(current).some((key) => current[key] !== original[key]);
  }

  const handleSubmit = async () => {
    console.log("handleSubmit triggered");

    const ingredientsArray = processMultilineInput(formData.ingredients);
    const instructionsArray = processMultilineInput(formData.instructions);
    const equipmentArray = processMultilineInput(formData.equipment);
    const authorNotesArray = processMultilineInput(formData.authorNotes);
    const cookTime = Number(formData.cookTimeStr);
    const prepTime = Number(formData.prepTimeStr);
    const servings = Number(formData.servingsStr);

    if (cookTime < 0 || prepTime <= 0 || servings <= 0) {
      alert(
        "Cook time, prep time and servings must be valid numbers greater than 0."
      );
      return;
    }

    const afterBoy = {};

    const token = localStorage.getItem("token");

    // if (!isFormChanged(formData, originalData)) {
    //   alert("No changes detected in the form.");
    //   return;
    // }

    Object.entries(formData).forEach(([key, value]) => {
      if (
        ![
          "ingredients",
          "instructions",
          "equipment",
          "authorNotes",
          "imageUrls",
        ].includes(key)
      ) {
        const originalValue = originalData[key] ?? "";
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          value !== originalValue
        ) {
          afterBoy[key] = value;
        }
      }
    });

    const arrayFields = {
      ingredients: ingredientsArray,
      instructions: instructionsArray,
      equipment: equipmentArray,
      authorNotes: authorNotesArray,
    };

    Object.entries(arrayFields).forEach(([key, arr]) => {
      const originalArr = processMultilineInput(originalData[key] || "");
      if (JSON.stringify(arr) !== JSON.stringify(originalArr)) {
        afterBoy[key] = arr;
      }
    });

    console.log("after boy is" + JSON.stringify(afterBoy));

    // images should be in a different method as they are two separate endpoints
    // const hasNewImages = imageUrls.some((file) => file);
    // if (hasNewImages) {
    //   imageUrls
    //     .filter(Boolean)
    //     .forEach((file) => afterBoy.append("images", file));
    // }

    try {
      const result = await axios.patch(`/api/recipes/${recipeId}`, afterBoy, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = result.data;
      console.log("Patch response:", response);

      if (response.message === "Updates were successfully made") {
        alert("Recipe updated successfully!");
        navigate(`/recipe/${recipeId}`);
      } else {
        alert(response.error);
      }
    } catch (err) {
      console.error("Error updating recipe:", err);
    }
  };

  return (
    <div className={theme === "dark" ? "dark-mode" : ""}>
      <div className="submit-recipe-page">
        <HeaderBar />
        <h1 className="submit-recipe-title">Modify Recipe</h1>
        <main className="submit-recipe-main-content">
          <div className="submit-recipe-major-left">
            <div className="submit-recipe-small">
              <div className="submit-recipe-span">
                <span className="bold">Recipe Title: </span>
                <span style={{ width: "0.5rem" }}></span>
                <div className="reg-input">
                  <input
                    name="submit-recipe-title-input"
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
                  name="submit-recipe-description-input"
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
                    name="submit-recipe-tag-input"
                    className="submit-recipe-tag-input"
                    value={formData.cuisineRegion}
                    onChange={(e) => {
                      const region = e.target.value;
                      console.log("cuisine region is set to " + region);
                      setFormData((prev) => ({
                        ...prev,
                        cuisineRegion: e.target.value,
                      }));
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
                    name="submit-recipe-tag-input"
                    value={formData.cuisineSubRegion}
                    className="submit-recipe-tag-input"
                    onChange={(e) => {
                      const subregion = e.target.value;
                      console.log("cuisine sub-region is set to " + subregion);
                      setFormData((prev) => ({
                        ...prev,
                        cuisineSubRegion: subregion,
                      }));
                    }}
                  >
                    <option value="">None</option>
                    {cuisineData.cuisineRegion[formData.cuisineRegion]?.map(
                      (value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <span style={{ width: "0.5rem" }}></span>
                <div className="reg-input">
                  <span className="submit-recipe-tag-bold">Protein: </span>
                  <select
                    name="submit-recipe-tag-input"
                    value={formData.proteinChoice}
                    className="submit-recipe-tag-input"
                    onChange={(e) => {
                      const protein = e.target.value;
                      console.log("Protein choice changed:", protein);
                      setFormData((prev) => ({
                        ...prev,
                        proteinChoice: protein,
                      }));
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
                    name="submit-recipe-tag-input"
                    value={formData.dietaryRestriction}
                    className="submit-recipe-tag-input"
                    onChange={(e) => {
                      const diet = e.target.value;
                      console.log("Dietary restriction changed:", diet);
                      setFormData((prev) => ({
                        ...prev,
                        dietaryRestriction: diet,
                      }));
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
                    name="submit-recipe-tag-input"
                    value={formData.religiousRestriction}
                    className="submit-recipe-tag-input"
                    onChange={(e) => {
                      const religion = e.target.value;
                      console.log("Religious restriction changed:", religion);
                      setFormData((prev) => ({
                        ...prev,
                        religiousRestriction: religion,
                      }));
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
                    name="submit-recipe-time-input"
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
                    name="submit-recipe-time-input"
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
                    name="submit-recipe-time-input"
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
                  name="submit-recipe-special-equipment-input"
                  className="submit-recipe-special-equipment-input"
                  placeholder="Add any special equipment needed for this recipe."
                  rows={2}
                  maxLength={500}
                  value={formData.equipment}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      equipment: e.target.value,
                    }));
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
                    name="submit-recipe-ingredients-input"
                    className="submit-recipe-ingredients-input"
                    placeholder="Specify ingredients"
                    rows={8}
                    maxLength={1500}
                    value={formData.ingredients}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        ingredients: e.target.value,
                      }));
                    }}
                  />
                </span>
                <div className="align-right">
                  <button
                    className="submit-button-clear"
                    onClick={() => {
                      console.log("Clear ingredients");
                      setFormData((prev) => ({ ...prev, ingredients: "" }));
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
                    name="submit-recipe-instructions-input"
                    className="submit-recipe-instructions-input"
                    placeholder="Specify instructions and special equipment callout"
                    rows={8}
                    maxLength={3000}
                    value={formData.instructions}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        instructions: e.target.value,
                      }));
                    }}
                  />
                </span>
                <div className="align-right">
                  <button
                    className="submit-button-clear"
                    onClick={() => {
                      console.log("Clear instructions");
                      setFormData((prev) => ({
                        ...prev,
                        instructions: "",
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
            <div className="submit-recipe-author-notes">
              <span className="bold">Author Notes (Optional) </span>
              <span className="reg">
                <textarea
                  name="submit-recipe-author-notes-input"
                  className="submit-recipe-author-notes-input"
                  placeholder="Add any final details."
                  rows={2}
                  maxLength={500}
                  value={formData.authorNotes}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      authorNotes: e.target.value,
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

export default ModifyRecipePage;
