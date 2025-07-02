import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../page-css/verify-email-page.css";
import topScreen from "../components/img/verify-email.png";
import VerifyButton from "../components/ui-basic-reusables/buttons/button-verify";
import axios from "axios";

function VerifyScreen() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please enter the token sent to your email");
      return;
    }
    try {
      const result = await axios.get(`/api/users/verify-email/${token}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = result.data;
      if (response.success) {
        alert("Your email has been verified!");
        navigate("/");
      } else {
        alert(response.error || "Verification failed. Please try again.");
      }
    } catch (err) {
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
    <div className="verify-password-page">
      <div className="verify-App">
        <header className="verify-wrapper">
          <img src={topScreen} alt="verify" className="verify-image" />
          <div className="verify-App-container">
            <div className="verify-upper-block">
              <div className="verify-wrapper1">
                <h1>Verify Your Email</h1>
                <p>
                  Please enter the code sent to your email in the form below.
                </p>
              </div>
            </div>
            <div className="verify-lower-block">
              <div className="verify-wrapper2">
                <div className="verify-form-container">
                  <form
                    onSubmit={handleVerifyEmail}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <label htmlFor="token-input" style={{ display: "none" }}>
                      Token
                    </label>
                    <input
                      id="token-input"
                      className="verify-reset-input"
                      type="text"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="verify your email"
                      required
                    />
                    <VerifyButton
                      type="submit"
                      aria-label="Verify Email"
                      disabled={!token}
                    >
                      Verify Email
                    </VerifyButton>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default VerifyScreen;
