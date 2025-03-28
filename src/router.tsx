import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CarbonCalculator from './pages/CarbonCalculator';
import Onboarding from './pages/Onboarding';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Onboarding />} />
    <Route path="/carbon" element={<CarbonCalculator />} />
  </Routes>
);
