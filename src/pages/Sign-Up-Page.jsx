import "../page-css/sign-up-page.css";
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

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
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
      const result = await axios.post(
        "http://localhost:8080/api/users/register",
        userCredentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = result.data;
      if (response.message === "User successfully registered") {
        navigate("/");
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

  const handleGoogleSignUpError = () => {
    console.log("Google Sign-Up Failed");
    alert("Google sign-up failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="App">
        <header className="App-header">
          <div className="app-container">
            <div className="left-block">
              <div className="wrapper signup">
                <p className="signup-welcome">Join Us!</p>
                <p className="signup-text">
                  Create an account to share your recipes, discover cooking
                  tips, and inspire others!
                </p>
                <img
                  src={landing1b_web}
                  alt="signup"
                  className="signup-image"
                />
              </div>
            </div>
            <div className="right-block">
              <div className="wrapper">
                <h1>Sign Up</h1>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSignUp();
                  }}
                >
                  <LabelLogin
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                  <LabelLogin
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <LabelLogin
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <LabelLogin
                    label="First name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                  />
                  <LabelLogin
                    label="Last name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                  />
                  <div className="login-button-container">
                    <button
                      type="submit"
                      onClick={handleSignUp}
                      className="btn-lg"
                      aria-label="Sign Up"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="sign-up">
                  <p>
                    Already have an account?{" "}
                    <Link to="/" className="sign-up-link">
                      Log in
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
                    onError={handleGoogleSignUpError}
                    className="social-button"
                  />
                  <FacebookLogin
                    appId="1088597931155576"
                    onSuccess={(response) => {
                      console.log("Sign-Up Success!", response);
                    }}
                    onFail={(error) => {
                      console.log("Sign-Up Failed!", error);
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
                      console.log("Apple Sign-Up button clicked!");
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

export default SignUpPage;
