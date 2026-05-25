import React, { useEffect, useState } from "react";
import ModalDefault from "./modal.jsx";
import "./modal-report.css";
import "./modal-delete.css";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import cautionDark from "../../img/icons/icon-caution-dark.png";
import cautionLight from "../../img/icons/icon-caution-light.png";
import { useTheme } from "../../../context/theme-context.js";
import axios from "axios";
import { getToken, deleteToken } from "../../../context/tokens.js";
import { useNavigate } from "react-router-dom";

const Modal =
  typeof ModalDefault === "function"
    ? ModalDefault
    : typeof ModalDefault?.default === "function"
      ? ModalDefault.default
      : null;

function ModalDeleteRecipe({ open, onClose, recipeId }) {
  const { theme } = useTheme();
  const [step, setStep] = useState(1);
  const [recipe, setRecipe] = useState(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipeInfo() {
      if (!recipeId) {
        setRecipe(null);
        setUsername("");
        setFullName("");
        return;
      }

      try {
        const response = await axios.get(`/api/recipes/${recipeId}`);
        const recipeData = response.data.recipe;
        setRecipe(recipeData);

        if (recipeData && recipeData.userId) {
          const userResponse = await axios.get(
            `/api/users/${recipeData.userId}`
          );
          const userInfo = userResponse.data.userInfo;
          const { username: loadedUsername, firstName, lastName } = userInfo;
          setUsername(loadedUsername || "");
          setFullName(`${firstName || ""} ${lastName || ""}`.trim());
        }
      } catch (err) {
        setRecipe(null);
        setUsername("");
        setFullName("");
      }
    }

    fetchRecipeInfo();
  }, [recipeId]);

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setUsernameInput("");
    setConfirmed(false);
    setVerifyMessage("");
  }, [open]);

  const handleVerifyUsername = (e) => {
    e.preventDefault();

    const expectedUsername = username?.trim().toLowerCase();
    const enteredUsername = usernameInput.trim().toLowerCase();

    if (!enteredUsername) {
      setConfirmed(false);
      setVerifyMessage("Please enter your username.");
      return;
    }

    if (!expectedUsername) {
      setConfirmed(false);
      setVerifyMessage("Could not load account username. Please try again.");
      return;
    }

    if (enteredUsername === expectedUsername) {
      setConfirmed(true);
      setVerifyMessage("Username verified.");
      return;
    }

    setConfirmed(false);
    setVerifyMessage("Username does not match this account.");
  };

  const handleDeleteRecipe = async () => {
    const currToken = getToken();
    deleteToken(currToken);

    try {
      await axios.delete(`/api/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${currToken}`,
        },
      });
      onClose();
      navigate("/profile");
    } catch (error) {
      console.error("Delete recipe failed:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={`modal-content ${theme === "dark" ? "dark" : "light"}`}>
        <div className="modal-delete-outer">
          <button className="modal-close-button" onClick={onClose}>
            <X size={24} />
          </button>
          {step === 1 && (
            <div className="modal-delete-body">
              <div className="modal-step">
                <h2 className="modal-delete-heading">
                  <img
                    src={theme === "dark" ? cautionDark : cautionLight}
                    alt="caution icon"
                    className="caution-icon"
                  />
                  DELETING RECIPE
                </h2>
                <div className="modal-delete-content">
                  <p>
                    Enter your account username to confirm identity before
                    deleting this recipe.
                  </p>
                  {recipe && (
                    <p>
                      {recipe.name ? `Recipe: ${recipe.name}` : "Recipe loaded"}
                      {fullName ? ` by ${fullName}` : ""}
                    </p>
                  )}
                  <form onSubmit={handleVerifyUsername}>
                    <label
                      htmlFor="delete-acct-username"
                      style={{ display: "none" }}
                    >
                      Account username
                    </label>
                    <input
                      id="delete-acct-username"
                      className="verify-reset-input"
                      type="text"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="Enter account username"
                      required
                    />
                    <button
                      type="submit"
                      className="fancy-button"
                      style={{ marginTop: "8px" }}
                    >
                      Verify Username
                    </button>
                  </form>
                  {verifyMessage && <p>{verifyMessage}</p>}
                  <div className="buttons-container">
                    <button onClick={onClose} className="fancy-button">
                      <X
                        color="var(--minor-accent-color-3)"
                        strokeWidth={1.5}
                        size={16}
                      />
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setStep(2);
                      }}
                      disabled={!confirmed || step === 2}
                      className="fancy-button"
                    >
                      Next
                      <ArrowRight
                        color="var(--text-color)"
                        strokeWidth={1.5}
                        size={16}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="modal-delete-body">
              <div className="modal-step">
                <h2 className="modal-delete-heading">
                  <img
                    src={theme === "dark" ? cautionDark : cautionLight}
                    alt="caution icon"
                    className="caution-icon"
                  />
                  DELETING RECIPE
                </h2>
                <div className="modal-delete-content">
                  <p>
                    This action permanently deletes the recipe and cannot be undone.
                  </p>
                  <button
                    className="fancy-button submit-button"
                    onClick={handleDeleteRecipe}
                    disabled={!confirmed}
                  >
                    Delete Recipe
                  </button>
                  <div className="buttons-container">
                    <button
                      onClick={() => {
                        setStep(1);
                      }}
                      disabled={step === 1}
                      className="fancy-button"
                    >
                      <ArrowLeft
                        color="var(--text-color)"
                        strokeWidth={1.5}
                        size={16}
                      />
                      Go Back
                    </button>
                    <button onClick={onClose} className="fancy-button">
                      <X
                        color="var(--minor-accent-color-3)"
                        strokeWidth={1.5}
                        size={16}
                      />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ModalDeleteRecipe;
