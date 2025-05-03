import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/Landing-Page';
import SignUpPage from '../pages/Sign-Up-Page';
import HomePage from '../pages/Home-Page';
import ForgotScreen from '../pages/Forgot-PW';
import ResetScreen from '../pages/Reset-PW';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/forgotpassword" element={<ForgotScreen />} />
      <Route path="/resetpassword" element={<ResetScreen />} />
    </Routes>
  );
};

export default AppRoutes;