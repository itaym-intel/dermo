import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import LandingPage from './pages/LandingPage';
import DiagnosisPage from './pages/DiagnosisPage';
import SkinScanner from './pages/SkinScanner';
import MoleScanner from './pages/MoleScanner';

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
        <Route path="/skin-scanner" element={<SkinScanner />} />
        <Route path="/mole-scanner" element={<MoleScanner />} />
      </Routes>
    </Router>
  );
}

export default App; 