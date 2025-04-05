import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';

const DiagnosisPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="card p-8">
            <h1 className="text-4xl font-display text-primary-900 mb-8 text-center">
              Choose a Scanner
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link to="/skin-scanner" className="card p-6 hover:shadow-hover transition-shadow">
                <h2 className="text-2xl font-display text-primary-900 mb-4">Skin Scanner</h2>
                <p className="text-primary-700">Analyze general skin conditions and get personalized recommendations.</p>
              </Link>
              
              <Link to="/mole-scanner" className="card p-6 hover:shadow-hover transition-shadow">
                <h2 className="text-2xl font-display text-primary-900 mb-4">Mole Scanner</h2>
                <p className="text-primary-700">Get insights about your moles and potential concerns.</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisPage; 