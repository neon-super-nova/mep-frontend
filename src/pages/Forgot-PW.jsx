import React, { useState } from "react";
import "../page-css/forgotpw-page.css";
import eggsOops from "../components/img/eggs-oops.png";
import ResetButton from "../components/ui-basic-reusables/buttons/button-reset";
import axios from "axios";

function ForgotScreen() {
  const [email, setEmail] = useState("");

  const handleValidate = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter a valid email address");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address format");
      return;
    }

    try {
      const result = await axios.post(
        "/api/users/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = result.data;
      if (response.message === "Password reset email sent") {
        alert("A reset link has been sent to your email.");
      } else {
        alert(response.error || "Invalid e-mail address, please try again.");
      }
    } catch (err) {
      console.error("Error during validation:", err);
      if (err.response) {
        alert(
          err.response.data.error || "An error occurred. Please try again."
        );
      } else {
        alert("Network error. Please check your connection and try again.");
      }
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forget-App">
        <header className="forget-wrapper">
          <div className="forget-App-container">
            <div className="forget-upper-block">
              <div className="forget-wrapper1">
                <h1>Forgot Password?</h1>
                <p>Please enter your email address to reset your password.</p>
              </div>
            </div>
            <div className="forget-lower-block">
              <div className="forget-wrapper2">
                <div className="forget-form-container">
                  <form
                    onSubmit={handleValidate}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <input
                      className="forgot-reset-input"
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                    <ResetButton
                      type="submit"
                      aria-label="Reset Password"
                      disabled={!email}
                    >
                      Reset Password
                    </ResetButton>
                  </form>
                </div>
              </div>
              <img src={eggsOops} alt="oops" className="forget-image" />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default ForgotScreen;
