import "../page-css/landing-page.css";
import LoginButton from "../components/ui-basic-reusables/buttons/button-login";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import LabelLogin from "../components/ui-basic-reusables/labels/label-input-login";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { GoogleLogin } from "@react-oauth/google";


import landing1b_web from "../components/img/landing-1b_web.png";
import axios from "axios";
import { saveToken, isLoggedIn } from "../context/tokens.js";
import googleIcon from "../components/img/social-media/google-icon.png";


function LandingPage() {
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");


 const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;


 const location = useLocation();
 const navigate = useNavigate();


 useEffect(() => {
   const params = new URLSearchParams(location.search);
   const token = params.get("token");
   if (token) {
     saveToken(token);
     navigate("/home", { replace: true });
   } else {
     if (isLoggedIn()) navigate("/home");
   }
 }, [location.search, navigate]);


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
               <div className="landing-form-container">
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


                 {/* Google button */}


                 <button
                   onClick={() => {
                     window.location.href =
                       "http://localhost:8080/api/users/auth/google";
                   }}
                   className="google-login-button"
                   aria-label="Continue with Google"
                 >
                   <img src={googleIcon} alt="Google icon" className="icon" />
                   Login with Google
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


export default LandingPage;



