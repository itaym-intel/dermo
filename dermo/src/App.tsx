import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DiagnosisPage from './pages/DiagnosisPage';
import MoleScanner from './pages/MoleScanner';
import SkinScanner from './pages/SkinScanner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
        <Route path="/mole-scanner" element={<MoleScanner />} />
        <Route path="/skin-scanner" element={<SkinScanner />} />
      </Routes>
    </Router>
  );
}

export default App; 