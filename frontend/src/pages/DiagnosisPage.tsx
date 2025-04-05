import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';

const DiagnosisPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Choose Your Scanner
          </h2>
          
          <div className="flex flex-row justify-center gap-8">
            <button
              onClick={() => navigate('/mole-scanner')}
              className="w-64 h-64 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                        text-white rounded-xl flex flex-col items-center justify-center p-6 
                        transition-all duration-300 transform hover:scale-105 shadow-lg
                        border-2 border-blue-400 hover:border-blue-300"
            >
              <h3 className="text-2xl font-semibold mb-3">Mole Scanner</h3>
              <p className="text-sm text-blue-100 text-center">
                Analyze moles for potential concerns
              </p>
            </button>

            <button
              onClick={() => navigate('/skin-scanner')}
              className="w-64 h-64 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 
                        text-white rounded-xl flex flex-col items-center justify-center p-6 
                        transition-all duration-300 transform hover:scale-105 shadow-lg
                        border-2 border-purple-400 hover:border-purple-300"
            >
              <h3 className="text-2xl font-semibold mb-3">Skin Scanner</h3>
              <p className="text-sm text-purple-100 text-center">
                Analyze general skin conditions
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisPage; 