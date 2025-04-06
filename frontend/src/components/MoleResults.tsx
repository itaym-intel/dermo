import React from 'react';

interface ScanResult {
  diagnosis: string;
  confidence: number;
  recommendations: string[];
}

interface MoleResultsProps {
  result: ScanResult;
  onBack: () => void;
}

const MoleResults: React.FC<MoleResultsProps> = ({ result, onBack }) => {
  const diagnosisColor = result.diagnosis === 'Cancer' ? 'text-red-600' : 'text-green-600';
  const confidencePercentage = (result.confidence * 100).toFixed(1);

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-primary-900 mb-6">Analysis Results</h2>
      
      <div className="space-y-6">
        {/* Diagnosis Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Diagnosis</h3>
          <p className={`text-2xl font-bold ${diagnosisColor}`}>
            {result.diagnosis}
          </p>
        </div>

        {/* Confidence Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Confidence Level</h3>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full ${result.diagnosis === 'Cancer' ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${confidencePercentage}%` }}
              ></div>
            </div>
            <span className="ml-4 text-lg font-semibold">{confidencePercentage}%</span>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Recommendations</h3>
          <ul className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span className="text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Scanner
          </button>
          <button
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            onClick={() => window.print()}
          >
            Print Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoleResults; 