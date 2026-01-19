import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../page-css/resetpw-page.css";
import eggsOops from "../components/img/eggs-oops.png";
import LabelReset from "../components/ui-basic-reusables/labels/label-input-reset";
import ChangeButton from "../components/ui-basic-reusables/buttons/button-change";
import axios from "axios";

function ResetScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleReset = async () => {
    if (!email || !newPassword || !confirmPassword || !temporaryPassword) {
      setErrorMessage("Complete all fields");
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, 1 letter, 1 number
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        "Password must be at least 8 characters long and include at least one letter and one number."
      );
      // alert(
      //   "Password must be at least 8 characters long and include at least one letter and one number."
      // );
      return;
    }

    try {
      const response = await axios.post(
        "/api/users/reset-password",
        {
          email: email,
          newPassword: newPassword,
          token: temporaryPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message === "Password was successfully changed") {
        navigate("/");
      } else {
        setErrorMessage(
          response.data.error || "An error occurred. Please try again."
        );
      }
    } catch (err) {
      setErrorMessage(
        err.response.data.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="reset-screen">
      <div className="reset-App-container">
        <div className="reset-upper-block">
          <div className="reset-wrapper1">
            <h1 className="reset-title">Reset Password</h1>
            <p className="reset-description">
              Please complete all fields below to reset your password:{""}
              <span className="reset-username">{email}</span>
            </p>{" "}
            <img src={eggsOops} alt="Oops" className="reset-image" />
          </div>
        </div>
        <div
          className="reset-lower-block"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="reset-wrapper2">
            <form
              className="reset-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleReset();
              }}
            >
              <LabelReset
                label="Temporary Password"
                type="password"
                value={temporaryPassword}
                onChange={(e) => setTemporaryPassword(e.target.value)}
                placeholder="Enter your temporary password"
              />
              <LabelReset
                label="Your email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <LabelReset
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
              />
              <LabelReset
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="reset-button-container">
                <ChangeButton
                  type="submit"
                  aria-label="Reset Password"
                  disabled={
                    newPassword !== confirmPassword ||
                    !newPassword ||
                    !confirmPassword
                  }
                  onClick={handleReset}
                  className="reset-password-button"
                >
                  Reset Password
                </ChangeButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetScreen;
