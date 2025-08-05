//import React, { useState, useEffect, useContext } from "react";
//import { useNavigate, useParams } from "react-router-dom";
import "../page-css/modify-recipe-page.css";

function ModifyRecipePage() {
  return (
    <div className="modify-recipe-page">
      <h1>Modify Recipe</h1>
      <div className="modify-recipe-content">
        <h2 className="modify-recipe-title">Modify a Recipe</h2>
        {/* Recipe Title Placeholder */}
        <div className="modify-recipe-title-section">
          <label htmlFor="recipe-title" className="modify-recipe-label">
            Recipe Title:
          </label>
          <input
            id="recipe-title"
            className="modify-recipe-title-input"
            type="text"
            placeholder="Enter recipe title"
            value=""
            onChange={() => {}}
          />
        </div>
        {/* Recipe Description Placeholder */}
        <div className="modify-recipe-description-section">
          <label htmlFor="recipe-description" className="modify-recipe-label">
            Description:
          </label>
          <textarea
            id="recipe-description"
            className="modify-recipe-description-input"
            placeholder="Enter recipe description"
            rows={3}
            maxLength={500}
            value=""
            onChange={() => {}}
          />
        </div>
        {/* Recipe Image Placeholder */}
        <div className="modify-recipe-image-section">
          <label className="modify-recipe-label">Recipe Image:</label>
          <div
            className="modify-recipe-image-preview"
            style={{
              width: "200px",
              height: "200px",
              background: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.5rem",
            }}
          >
            <span style={{ color: "#aaa" }}>Image Preview</span>
          </div>
          <input type="file" accept="image/*" onChange={() => {}} />
        </div>
        <main className="modify-recipe-main-content">
          <div className="modify-recipe-form-section">
            <div className="reg-input">
              <span className="modify-recipe-tag-bold">Region: </span>
              <select
                className="modify-recipe-tag-input"
                onChange={() => {}}
                value=""
              >
                <option value="">None</option>
                {/* Placeholder: No region options available */}
              </select>
            </div>
            <span style={{ width: "0.5rem" }}></span>
            <div className="reg-input">
              <span className="modify-recipe-tag-bold">Sub-Region: </span>
              <select
                className="modify-recipe-tag-input"
                onChange={() => {}}
                value=""
              >
                <option value="">None</option>
                {/* Placeholder: No sub-region options available */}
              </select>
            </div>
            <span style={{ width: "0.5rem" }}></span>
            <div className="reg-input">
              <span className="modify-recipe-tag-bold">Protein: </span>
              <select
                className="modify-recipe-tag-input"
                onChange={() => {}}
                value=""
              >
                <option value="">None</option>
                {/* Placeholder: No protein options available */}
              </select>
            </div>
            <span style={{ width: "0.5rem" }}></span>
            <div className="reg-input">
              <span className="modify-recipe-tag-bold">
                Special Equipment (Optional){" "}
              </span>
              <span className="reg">
                <textarea
                  className="modify-recipe-special-equipment-input"
                  placeholder="Add any special equipment needed for this recipe."
                  rows={2}
                  maxLength={500}
                  value=""
                  onChange={() => {}}
                />
              </span>
            </div>
          </div>
          <div className="modify-recipe-major-right">
            <div className="modify-recipe-details">
              <div className="left">
                <span className="bold">Ingredients: </span>
                <span className="reg">
                  <textarea
                    className="modify-recipe-ingredients-input"
                    placeholder="Specify ingredients"
                    rows={8}
                    maxLength={1500}
                    value=""
                    onChange={() => {}}
                  />
                </span>
                <div className="align-right">
                  <button className="modify-button-clear" onClick={() => {}}>
                    Clear
                  </button>
                </div>
              </div>
              <div className="right">
                <span className="bold">Instructions: </span>
                <span className="reg">
                  <textarea
                    className="modify-recipe-instructions-input"
                    placeholder="Specify instructions and special equipment callout"
                    rows={8}
                    maxLength={3000}
                    value=""
                    onChange={() => {}}
                  />
                </span>
                <div className="align-right">
                  <button className="modify-button-clear" onClick={() => {}}>
                    Clear
                  </button>
                </div>
              </div>
            </div>
            <div className="modify-recipe-author-notes">
              <span className="bold">Author Notes (Optional) </span>
              <span className="reg">
                <textarea
                  className="modify-recipe-author-notes-input"
                  placeholder="Add any final details."
                  rows={2}
                  maxLength={500}
                  value=""
                  onChange={() => {}}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
              </span>
            </div>
            <div className="modify-recipe-button-container">
              <button
                onClick={() => {}}
                aria-label="Submit Changes"
                className="modify-upload-button"
              >
                Submit Changes
              </button>
            </div>
          </div>
        </main>
        <footer className="modify-recipe-footer">
          <p>Footer Content</p>
        </footer>
      </div>
    </div>
  );
}
export default ModifyRecipePage;
