import React from 'react';
import './App.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './app/store';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './router';
import Onboarding from './pages/Onboarding';
import { Routes, Route } from 'react-router-dom';
import CarbonCalculator from './pages/CarbonCalculator';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/carbon" element={<CarbonCalculator />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
