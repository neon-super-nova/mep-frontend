import React, { useState } from "react";
import Modal from "./modal";
import "./modal-report.css";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import cautionDark from "../../img/icons/icon-caution-dark.png";
import cautionLight from "../../img/icons/icon-caution-light.png";
import { useTheme } from "../../../context/theme-context.js";

function ModalReport({ open, onClose }) {
  const [step, setStep] = useState(1);
  const { theme } = useTheme();

  const [initialChoice, setInitialChoice] = useState("");
  const [inappropriateSubchoice, setInappropriateSubchoice] = useState("");
  const [privacySubchoice, setPrivacySubchoice] = useState("");
  const [intpropSubchoice, setIntpropSubchoice] = useState("");
  const [abuseSubchoice, setAbuseSubchoice] = useState("");
  const [feedback, setFeedback] = useState("");

  const initialChoices = [
    {
      value: "inappropriate",
      label: "User published threatening or inappropriate material",
    },
    { value: "privacy", label: "User breached another user's privacy" },
    {
      value: "intellectual-property",
      label: "User infringed on another person or company's protected content",
    },
    { value: "abuse", label: "User abused platform features" },
  ];

  const inappropriateSubchoices = [
    { value: "hate-speech", label: "Hate Speech" },
    { value: "nudity", label: "Nudity or Sexual Content" },
    { value: "threats", label: "Harassment or Threats of Violence" },
    { value: "scams", label: "Scams, Fraud or Misleading Content" },
    { value: "other", label: "Other" },
  ];
  const privacySubchoices = [
    { value: "personal-info", label: "Personal Information" },
    { value: "data-collection", label: "Unauthorized Data Collection" },
    { value: "other", label: "Other" },
  ];
  const intpropSubchoices = [
    { value: "copyright", label: "Copyright Infringement" },
    { value: "trademark", label: "Trademark Violation" },
    { value: "plagiarism", label: "Plagiarism" },
    { value: "other", label: "Other" },
  ];
  const abuseSubchoices = [
    { value: "spam", label: "User re-published this recipe" },
    { value: "bot", label: "User is a bot account or posted spam" },
    { value: "rules", label: "User broke m-e-p rules" },
    { value: "other", label: "Other" },
  ];

  // Reset state when modal closes
  React.useEffect(() => {
    if (!open) {
      setStep(1);
      setInitialChoice("");
      setInappropriateSubchoice("");
      setPrivacySubchoice("");
      setIntpropSubchoice("");
      setAbuseSubchoice("");
      setFeedback("");
    }
  }, [open]);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <Modal open={open} onClose={onClose}>
        <div className="modal-report-outer">
          {step === 1 && (
            <div className="modal-report-body">
              <h2 className="modal-report-heading">
                <img
                  src={theme === "dark" ? cautionDark : cautionLight}
                  alt="caution icon"
                  className="caution-icon"
                />
                File A Complaint
              </h2>
              <div className="modal-report-content">
                <p>
                  Thank you for helping maintain our community standards by
                  reporting rule violations. Please provide details about the
                  situation, and our team will promptly investigate the matter.
                </p>
                <div className="radio-group">
                  {initialChoices.map((opt) => (
                    <label key={opt.value}>
                      <input
                        type="radio"
                        name="initial-choice"
                        value={opt.value}
                        checked={initialChoice === opt.value}
                        onChange={() => setInitialChoice(opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
                <div className="buttons-container">
                  <button onClick={onClose}>
                    <X
                      color="var(--minor-accent-color-3)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      if (initialChoice === "inappropriate") setStep(2);
                      else if (initialChoice === "privacy") setStep(3);
                      else if (initialChoice === "intellectual-property")
                        setStep(4);
                      else if (initialChoice === "abuse") setStep(5);
                    }}
                    disabled={!initialChoice}
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
          )}

          {step === 2 && (
            <div className="modal-report-body">
              <h2 className="modal-report-heading">
                <img
                  src={theme === "dark" ? cautionDark : cautionLight}
                  alt="caution icon"
                  className="caution-icon"
                />
                File A Complaint
              </h2>
              <div className="modal-report-content">
                <p>
                  Thank you for helping maintain our community standards by
                  reporting rule violations. Please provide details about the
                  situation, and our team will promptly investigate the matter.{" "}
                </p>
                <h6>"User published threatening or inappropriate material"</h6>
                <div className="radio-group">
                  {inappropriateSubchoices.map((opt) => (
                    <label key={opt.value}>
                      <input
                        type="radio"
                        name="inappropriateSubchoice"
                        value={opt.value}
                        checked={inappropriateSubchoice === opt.value}
                        onChange={() => setInappropriateSubchoice(opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
                <div className="buttons-container">
                  <button onClick={onClose}>
                    <X
                      color="var(--minor-accent-color-3)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setStep(1);
                      setInappropriateSubchoice("");
                    }}
                  >
                    <ArrowLeft
                      color="var(--text-color)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Go Back
                  </button>
                  <button
                    onClick={() => {
                      if (inappropriateSubchoice === "other") setStep(6);
                      else setStep(7);
                    }}
                    disabled={!inappropriateSubchoice}
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
          )}

          {step === 3 && (
            <div className="modal-report-body">
              <h2 className="modal-report-heading">
                <img
                  src={theme === "dark" ? cautionDark : cautionLight}
                  alt="caution icon"
                  className="caution-icon"
                />
                File A Complaint
              </h2>
              <div className="modal-report-content">
                <p>
                  Thank you for helping maintain our community standards by
                  reporting rule violations. Please provide details about the
                  situation, and our team will promptly investigate the matter.{" "}
                </p>
                <h6>"User breached another user's privacy"</h6>
                <div className="radio-group">
                  {privacySubchoices.map((opt) => (
                    <label key={opt.value}>
                      <input
                        type="radio"
                        name="privacySubchoice"
                        value={opt.value}
                        checked={privacySubchoice === opt.value}
                        onChange={() => setPrivacySubchoice(opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
                <div className="buttons-container">
                  <button onClick={onClose}>
                    <X
                      color="var(--minor-accent-color-3)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setStep(1);
                      setPrivacySubchoice("");
                    }}
                  >
                    <ArrowLeft
                      color="var(--text-color)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Go Back
                  </button>
                  <button
                    onClick={() => {
                      if (privacySubchoice === "other") setStep(6);
                      else setStep(7);
                    }}
                    disabled={!privacySubchoice}
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
          )}

          {step === 4 && (
            <div className="modal-report-body">
              <h2 className="modal-report-heading">
                <img
                  src={theme === "dark" ? cautionDark : cautionLight}
                  alt="caution icon"
                  className="caution-icon"
                />
                File A Complaint
              </h2>
              <div className="modal-report-content">
                <p>
                  Thank you for helping maintain our community standards by
                  reporting rule violations. Please provide details about the
                  situation, and our team will promptly investigate the matter.
                </p>
                <h6>
                  "User infringed on another person or company's protected
                  content"
                </h6>
                <div className="radio-group">
                  {intpropSubchoices.map((opt) => (
                    <label key={opt.value}>
                      <input
                        type="radio"
                        name="intpropSubchoice"
                        value={opt.value}
                        checked={intpropSubchoice === opt.value}
                        onChange={() => setIntpropSubchoice(opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
                <div className="buttons-container">
                  <button onClick={onClose}>
                    <X
                      color="var(--minor-accent-color-3)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setStep(1);
                      setIntpropSubchoice("");
                    }}
                  >
                    <ArrowLeft
                      color="var(--text-color)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Go Back
                  </button>
                  <button
                    onClick={() => {
                      if (intpropSubchoice === "other") setStep(6);
                      else setStep(7);
                    }}
                    disabled={!intpropSubchoice}
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
          )}

          {step === 5 && (
            <div className="modal-report-body">
              <h2 className="modal-report-heading">
                <img
                  src={theme === "dark" ? cautionDark : cautionLight}
                  alt="caution icon"
                  className="caution-icon"
                />
                File A Complaint
              </h2>
              <div className="modal-report-content">
                <p>
                  Thank you for helping maintain our community standards by
                  reporting rule violations. Please provide details about the
                  situation, and our team will promptly investigate the matter.
                </p>
                <h6> "User abused platform features"</h6>
                <div className="radio-group">
                  {abuseSubchoices.map((opt) => (
                    <label key={opt.value}>
                      <input
                        type="radio"
                        name="abuseSubchoice"
                        value={opt.value}
                        checked={abuseSubchoice === opt.value}
                        onChange={() => setAbuseSubchoice(opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
                <div className="buttons-container">
                  <button onClick={onClose}>
                    <X
                      color="var(--minor-accent-color-3)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setStep(1);
                      setAbuseSubchoice("");
                    }}
                  >
                    <ArrowLeft
                      color="var(--text-color)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Go Back
                  </button>
                  <button
                    onClick={() => {
                      if (abuseSubchoice === "other") setStep(6);
                      else setStep(7);
                    }}
                    disabled={!abuseSubchoice}
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
          )}

          {step === 6 && (
            <div className="modal-report-body other">
              <h2 className="modal-report-heading">
                <img
                  src={theme === "dark" ? cautionDark : cautionLight}
                  alt="caution icon"
                  className="caution-icon"
                />
                File A Complaint
              </h2>
              <div className="modal-report-content">
                <p className="modal-report-subheading">
                  Summarize what happened in a few words (optional, max 300
                  characters):
                </p>
                <textarea
                  className="textarea-feedback"
                  placeholder="Please provide any additional details or context that may help us understand the situation better."
                  rows={5}
                  maxLength={300}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <div className="char-remaining">
                  {300 - feedback.length} characters remaining
                </div>
                <div className="buttons-container">
                  <button onClick={onClose}>
                    <X
                      color="var(--minor-accent-color-3)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setStep(1);
                      if (feedback.length !== 0) setFeedback("");
                    }}
                  >
                    <ArrowLeft
                      color="var(--text-color)"
                      strokeWidth={1.5}
                      size={16}
                    />
                    Go Back
                  </button>

                  <button
                    onClick={() => setStep(7)}
                    disabled={feedback.length === 0}
                    className="submit-button"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
          {step === 7 && (
            <div className="modal-report-body close">
              <h2 className="modal-report-heading">
                <img
                  src={theme === "dark" ? cautionDark : cautionLight}
                  alt="caution icon"
                  className="caution-icon"
                />
                Thank You!
              </h2>
              <div className="modal-report-content">
                <p className="text-container-end">
                  Your report has been submitted.
                </p>
                <div className="buttons-container-end">
                  <button onClick={onClose}>Close</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ModalReport;
