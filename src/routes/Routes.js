import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../pages/ProtectedRoute";
import LandingPage from "../pages/Landing-Page";
import SignUpPage from "../pages/Sign-Up-Page";
import HomePage from "../pages/Home-Page";
import ForgotScreen from "../pages/Forgot-PW";
import ResetScreen from "../pages/Reset-PW";
import VerifyScreen from "../pages/Verify-Email";
import AdvancedSearchPage from "../pages/Advanced-Search-Page";
import UserPage from "../pages/User-Page";
import SettingsPage from "../pages/Settings-Page";
// import RecipeBoxPage from "../pages/Recipe-Box-Page";
import NotificationsPage from "../pages/Notifications-Page";
import RecipePage from "../pages/Recipe-Page";
import SubmitRecipePage from "../pages/Submit-Recipe-Page";
import ModifyRecipePage from "../pages/Modify-Recipe-Page";

const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgotpassword" element={<ForgotScreen />} />
      <Route path="/resetpassword" element={<ResetScreen />} />
      <Route path="/verify-email" element={<VerifyScreen />} />

      {/* protected routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/advancedsearch"
        element={
          <ProtectedRoute>
            <AdvancedSearchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/recipebox"
        element={
          <ProtectedRoute>
            <RecipeBoxPage />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recipe/:recipeId"
        element={
          <ProtectedRoute>
            <RecipePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/modify-recipe/:recipeId"
        element={
          <ProtectedRoute>
            <ModifyRecipePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/submit-recipe"
        element={
          <ProtectedRoute>
            <SubmitRecipePage />
          </ProtectedRoute>
        }
      />

      {/* fallback to */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;