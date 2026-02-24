import React, { useState } from "react";
import ModalDefault from "./modal";
import "./modal-report.css";
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


function ModalDeleteAcct({ open, onClose }) {
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
                <button className="modal-close-button" onClick={onClose}>
                    <X size={24} />
                </button>
                {step === 1 && (
                    <div className="modal-step">
                        <img
                            src={theme === "dark" ? cautionDark : cautionLight}
                            alt="Caution"
                            className="caution-icon"
                        />
                        <h2>Are you sure you want to delete this item?</h2>
                        <p>This action cannot be undone.</p>
                    </div>
                )}
                {step === 2 && (
                    <div className="modal-step">
                        <h2>Confirm Deletion</h2>
                        <p>Please confirm that you want to delete this item.</p>
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
                        <button className="modal-button delete-button" onClick={() => {
                            // Handle the actual deletion logic here
                            onClose();
                        }}>
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
}

export default ModalDeleteAcct;