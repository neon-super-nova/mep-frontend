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

function LandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
    console.log("Login button clicked!");
    navigate("/home");
  };

  const handleGoogleLoginError = () => {
    console.log("Google Login Failed");
    alert("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="App">
        <header className="App-header">
          <div className="app-container">
            <div className="left-block">
              <div className="wrapper landing">
                <p className="landing-welcome">Welcome!</p>
                <p className="landing-text">
                  Share your recipes, discover cooking tips, and inspire others!
                </p>
                <img
                  src={landing1b_web}
                  alt="landing"
                  className="landing-image"
                />
              </div>
            </div>
            <div className="right-block">
              <div className="wrapper">
                <h1>Login</h1>
                <form>
                  <LabelLogin
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                  <LabelLogin
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <div className="login-button-container">
                    <LoginButton onClick={handleLogin} aria-label="Login" />
                  </div>
                </form>
                <div className="sign-up">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/signup" className="sign-up-link">
                      Sign up
                    </Link>
                  </p>
                  <p>
                    check home{" "}
                    <Link to="/home" className="home-link">
                      Home
                    </Link>
                  </p>
                </div>
                <div className="social-login-buttons">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                    }}
                    onError={handleGoogleLoginError}
                    className="social-button"
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
                    className="btn-fb-signin social-button"
                  >
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="facebook-icon"
                      style={{ marginRight: "8px" }}
                    />
                    Continue with Facebook
                  </FacebookLogin>
                  <MyAppleSigninButton
                    onPress={() => {
                      console.log("Apple Sign In button clicked!");
                    }}
                    className="btn-apple-signin social-button"
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
