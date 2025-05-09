import "../page-css/landing-page.css";
import LoginButton from "../components/ui-basic-reusables/buttons/button-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LabelLogin from "../components/ui-basic-reusables/labels/label-input-login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import MyAppleSigninButton from "../components/ui-basic-reusables/buttons/apple-bougie-sign-in-button";
import FacebookLogin from "@greatsumini/react-facebook-login";
import landing1b_web from "../components/img/landing-1b_web.png";
import axios from "axios";
import { saveToken } from "../context/tokens.js";

function LandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    const userCredentials = {
      username,
      password,
    };

    try {
      const result = await axios.post("/api/users/login", userCredentials, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const response = result.data;
      if (response.message === "Login successful") {
        saveToken(response.token);
        navigate("/home");
      } else {
        alert(response.error || "Please, try again");
      }
    } catch (err) {
      console.error("Error during login:", err);
      if (err.response) {
        alert(err.response.data.error);
      }
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Google Login Failed");
    alert("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="landing-App">
        <header className="landing-App-header">
          <div className="landing-App-container">
            <div className="landing-left-block">
              <div className="landing-wrapper landing">
                <p className="landing-welcome">Welcome!</p>
                <p className="landing-text">
                  Share your recipes, discover cooking tips,
                  <br /> and inspire others!
                </p>
                <img
                  src={landing1b_web}
                  alt="landing"
                  className="landing-image"
                />
              </div>
            </div>
            <div className="landing-right-block">
              <div className="landing-wrapper">
                <h1>Login</h1>
                <form
                  name="login-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  <LabelLogin
                    label="Username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                  <LabelLogin
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="password-short-margin"
                  />
                  <div className="forgot-password-container">
                    <Link to="/forgotpassword" className="landing-home-link">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="landing-login-button-container">
                    <LoginButton onClick={handleLogin} aria-label="Login" />
                  </div>
                </form>
                <div className="landing-sign-up">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/signup" className="landing-sign-up-link">
                      Sign up
                    </Link>
                  </p>
                </div>
                <div className="landing-social-login-buttons">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                    }}
                    onError={handleGoogleLoginError}
                    className="landing-social-button"
                  />
                  <FacebookLogin
                    appId="1088597931155576"
                    onSuccess={(response) => {
                      console.log("Login Success!", response);
                    }}
                    onFail={(error) => {
                      console.log("Login Failed!", error);
                    }}
                    onProfileSuccess={(response) => {
                      console.log("Get Profile Success!", response);
                    }}
                    className="btn-fb-signin landing-social-button"
                  >
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="landing-facebook-icon"
                      style={{ marginRight: "8px" }}
                    />
                    Continue with Facebook
                  </FacebookLogin>
                  <MyAppleSigninButton
                    onPress={() => {
                      console.log("Apple Sign In button clicked!");
                    }}
                    className="btn-apple-signin landing-social-button"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LandingPage;
