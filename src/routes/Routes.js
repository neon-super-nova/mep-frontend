import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/Landing-Page';
import SignUpPage from '../pages/Sign-Up-Page';
import HomePage from '../pages/Home-Page';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;
