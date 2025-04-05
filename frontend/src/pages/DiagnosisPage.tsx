import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';

const DiagnosisPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="card p-8">
            <h1 className="text-4xl font-display font-bold text-primary-900 mb-8 text-center">
              Comprehensive Diagnosis
            </h1>
            
            <div className="flex flex-col items-center gap-8">
              <p className="text-xl text-primary-700 text-center max-w-2xl">
                Choose the type of diagnosis you need. Our AI-powered system will guide you through the process and provide you with detailed results and recommendations.
              </p>

              <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
                <button
                  onClick={() => navigate('/skin-scanner')}
                  className="card p-6 hover:shadow-hover transition-all duration-300"
                >
                  <div className="text-4xl mb-4">🔬</div>
                  <h2 className="text-2xl font-display font-semibold text-primary-900 mb-2">
                    Skin Scanner
                  </h2>
                  <p className="text-primary-700">
                    Get a comprehensive analysis of your skin condition with our advanced AI technology.
                  </p>
                </button>

                <button
                  onClick={() => navigate('/mole-scanner')}
                  className="card p-6 hover:shadow-hover transition-all duration-300"
                >
                  <div className="text-4xl mb-4">🔍</div>
                  <h2 className="text-2xl font-display font-semibold text-primary-900 mb-2">
                    Mole Scanner
                  </h2>
                  <p className="text-primary-700">
                    Monitor and analyze your moles for any concerning changes or patterns.
                  </p>
                </button>
              </div>

              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-white text-primary-700 border-2 border-primary-200 rounded-full hover:bg-primary-50 transition-colors font-medium"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisPage; 