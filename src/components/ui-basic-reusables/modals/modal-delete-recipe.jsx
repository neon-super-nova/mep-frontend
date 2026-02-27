import React, { useState } from "react";
import ModalDefault from "./modal";
import "./modal-report.css";
import "./modal-delete.css";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import cautionDark from "../../img/icons/icon-caution-dark.png";
import cautionLight from "../../img/icons/icon-caution-light.png";
import { useTheme } from "../../../context/theme-context.js";

const Modal =
  typeof ModalDefault === "function"
    ? ModalDefault
    : typeof ModalDefault?.default === "function"
      ? ModalDefault.default
      : null;

function ModalDeleteRecipe({ open, onClose }) {
  const { theme } = useTheme();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
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
                  DELETING ACCOUNT
                </h2>
                <div className="modal-delete-content">
                  <p>
                    Thank you for helping maintain our community standards by
                    reporting rule violations. Please provide details about the
                    situation, and our team will promptly investigate the
                    matter.
                  </p>
                  <p>verify email</p>
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
                      disabled={step === 2}
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
                  DELETING ACCOUNT
                </h2>
                <div className="modal-delete-content">
                  <p>
                    Thank you for helping maintain our community standards by
                    reporting rule violations. Please provide details about the
                    situation, and our team will promptly investigate the
                    matter.
                  </p>
                  <button
                    className="fancy-button submit-button"
                    // onClick={}
                    // disabled={}
                  >
                    Delete Account
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
          <div className="modal-footer">
            {step > 1 && (
              <button className="modal-button" onClick={handleBack}>
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            {step < 2 && (
              <button className="modal-button" onClick={handleNext}>
                Next
                <ArrowRight size={16} />
              </button>
            )}
            {step === 2 && (
              <button
                className="modal-button delete-button"
                onClick={() => {
                  // Handle the actual deletion logic here
                  onClose();
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalDeleteRecipe;
