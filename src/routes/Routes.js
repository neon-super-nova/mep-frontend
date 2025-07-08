import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/Landing-Page";
import SignUpPage from "../pages/Sign-Up-Page";
import HomePage from "../pages/Home-Page";
import ForgotScreen from "../pages/Forgot-PW";
import ResetScreen from "../pages/Reset-PW";
import VerifyScreen from "../pages/Verify-Email";
import AdvancedSearchPage from "../pages/Advanced-Search-Page";
import UserPage from "../pages/User-Page";
import SettingsPage from "../pages/Settings-Page";
import RecipeBoxPage from "../pages/Recipe-Box-Page";
import NotificationsPage from "../pages/Notifications-Page";
import RecipePage from "../pages/Recipe-Page";
import SubmitRecipePage from "../pages/Submit-Recipe-Page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/forgotpassword" element={<ForgotScreen />} />
      <Route path="/resetpassword" element={<ResetScreen />} />
      <Route path="/verify-email" element={<VerifyScreen />} />
      <Route path="/advancedsearch" element={<AdvancedSearchPage />} />
      <Route path="/profile" element={<UserPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/recipebox" element={<RecipeBoxPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/recipe/:recipeId" element={<RecipePage />} />
      <Route path="/submit-recipe" element={<SubmitRecipePage />} />
    </Routes>
  );
};

export default AppRoutes;
