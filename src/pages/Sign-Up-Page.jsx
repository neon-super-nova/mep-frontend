import "../page-css/sign-up-page.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LabelLogin from "../components/ui-basic-reusables/labels/label-input-login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import landing1b_web from "../components/img/landing-1b_web.png";
import googleIcon from "../components/img/social-media/google-icon.png";
import axios from "axios";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }
    const userCredentials = {
      username,
      email,
      password,
      firstName,
      lastName,
    };
    try {
      const result = await axios.post("/api/users/register", userCredentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = result.data;
      if (response.message === "User successfully registered") {
        alert("Check you email inbox to verify your email");
      } else {
        alert(response.error || "Try again");
      }
    } catch (err) {
      console.error("Error during login:", err);
      if (err.response) {
        alert(err.response.data.error);
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="signup-App">
        <header className="signup-App-header">
          <div className="signup-App-container">
            <div className="signup-left-block">
              <div className="signup-wrapper signup">
                <h1 className="signup-welcome">Join Us!</h1>
                <p className="signup-text">
                  Create an account to share your recipes,
                  <br />
                  discover cooking tips, and inspire others!
                </p>
                <img
                  src={landing1b_web}
                  alt="signup"
                  className="signup-image"
                />
              </div>
            </div>
            <div className="signup-right-block">
              <div className="signup-wrapper">
                <div className="signup-form-container">
                  <h1>Sign Up</h1>
                  <form
                    name="signup-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSignUp();
                    }}
                  >
                    <LabelLogin
                      label="Username"
                      name="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="signup-label"
                    />
                    <LabelLogin
                      label="Email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="signup-label"
                    />
                    <LabelLogin
                      label="Password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="signup-label"
                    />
                    <LabelLogin
                      label="First name"
                      name="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      className="signup-label"
                    />
                    <LabelLogin
                      label="Last name"
                      name="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      className="signup-label"
                    />
                    <div className="signup-login-button-container">
                      <button
                        //onClick={handleSignUp}
                        className="btn-lg-skinny"
                        aria-label="Sign Up"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                  <div className="signup-sign-up">
                    <p>
                      Already have an account?{" "}
                      <Link to="/" className="signup-sign-up-link">
                        Log in
                      </Link>
                    </p>
                  </div>

                  {/* Google button */}
                  <button
                    onClick={() => {
                      window.location.href =
                        "http://localhost:8080/api/users/auth/google";
                    }}
                    className="google-login-button"
                    aria-label="Sign Up with Google"
                  >
                    <img src={googleIcon} alt="Google icon" className="icon" />
                    Sign Up with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </GoogleOAuthProvider>
  );
}

export default SignUpPage;
