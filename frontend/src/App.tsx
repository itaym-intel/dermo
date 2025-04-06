import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import TopBar from './components/TopBar';
import LandingPage from './pages/LandingPage';
import DiagnosisPage from './pages/DiagnosisPage';
import SkinScanner from './pages/SkinScanner';
import MoleScanner from './pages/MoleScanner';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <TopBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/diagnosis"
            element={
              <ProtectedRoute>
                <DiagnosisPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/skin-scanner"
            element={
              <ProtectedRoute>
                <SkinScanner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mole-scanner"
            element={
              <ProtectedRoute>
                <MoleScanner />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 