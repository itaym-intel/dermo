import React, { useEffect } from 'react';

interface SkinAdvice {
  Info: string;
  "At-Home Treatment": string;
  "Clinical Treatment": string;
  Severity: string;
}

interface SkinResult {
  prediction: string;
  advice: SkinAdvice;
  confidence: number;
}

interface SkinResultsProps {
  result: SkinResult;
  onBack: () => void;
}

const SkinResults: React.FC<SkinResultsProps> = ({ result, onBack }) => {
  // Add useEffect for scroll reset
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!result || !result.advice) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-medium text-gray-900">Analysis Results</h2>
              <button
                onClick={onBack}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
            </div>
            <div className="text-red-600 text-center">
              Error: No results available. Please try again.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string | undefined) => {
    if (!severity) return 'text-gray-600 bg-gray-50 border-gray-200';
    
    const severityLower = severity.toLowerCase();
    for (const word of ['mild', 'low']) {
      if (severityLower.includes(word)) return 'text-blue-600 bg-blue-50 border-blue-200';
    }
    for (const word of ['moderate', 'medium']) {
      if (severityLower.includes(word)) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
    for (const word of ['high', 'severe']) {
      if (severityLower.includes(word)) return 'text-red-600 bg-red-50 border-red-200';
    }
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const severityStyles = getSeverityColor(result.advice.Severity);
  const confidencePercentage = Math.round(result.confidence * 100);
  
  // Function to determine progress bar color based on confidence level
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-500';
    if (confidence >= 0.6) return 'bg-blue-500';
    if (confidence >= 0.4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2">
            Analysis Results
        </h2>
        <p className="text-gray-600">Your skin condition has been analyzed using our AI-powered system</p>
      </div>

      {/* Main Prediction Card */}
      <div className={`p-6 rounded-2xl ${severityStyles.split(' ')[1]} border-2 ${severityStyles.split(' ')[2]} shadow-lg mb-8`}>
        <div className="flex items-center gap-4 mb-6">
          <div className={`text-5xl ${severityStyles.split(' ')[0]}`}>
            {result.advice.Severity?.toLowerCase().includes('mild') ? '🔵' : 
             result.advice.Severity?.toLowerCase().includes('moderate') ? '🟡' : '🔴'}
          </div>
          <h3 className={`text-3xl font-bold ${severityStyles.split(' ')[0]}`}>
            {result.prediction || 'Unknown Condition'}
          </h3>
        </div>

        {/* Confidence Level */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h4 className="text-3xl font-bold text-gray-800 mb-3">Confidence Level</h4>
          <div className="text-xl font-semibold text-gray-700 mb-2">
            {confidencePercentage}%
          </div>
          
          {/* Confidence Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div 
              className={`h-4 rounded-full ${getConfidenceColor(result.confidence)}`}
              style={{ width: `${confidencePercentage}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500">
            {confidencePercentage >= 80 ? 'Very High Confidence' : 
             confidencePercentage >= 60 ? 'High Confidence' : 
             confidencePercentage >= 40 ? 'Moderate Confidence' : 'Low Confidence'}
          </div>
        </div>
      </div>

      {/* Info Boxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Clinical Information */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 h-full">
          <h4 className="text-3xl font-bold text-gray-800 mb-4">Clinical Information</h4>
          <p className="text-gray-700 leading-relaxed text-lg">{result.advice.Info || 'Not available'}</p>
        </div>

        {/* Self-Care Recommendations */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 h-full">
          <h4 className="text-3xl font-bold text-gray-800 mb-4">Self-Care Recommendations</h4>
          <p className="text-gray-700 leading-relaxed text-lg">{result.advice["At-Home Treatment"] || 'Not available'}</p>
        </div>

        {/* Severity Assessment */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 h-full">
          <h4 className="text-3xl font-bold text-gray-800 mb-4">Severity Assessment</h4>
          <p className="text-gray-700 leading-relaxed text-lg">{result.advice.Severity || 'Not available'}</p>
        </div>

        {/* Professional Treatment Options */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 h-full">
          <h4 className="text-3xl font-bold text-gray-800 mb-4">Professional Treatment Options</h4>
          <p className="text-gray-700 leading-relaxed text-lg">{result.advice["Clinical Treatment"] || 'Not available'}</p>
        </div>
      </div>

      {/* Important Information */}
      <div className="mt-8 bg-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">⚖️</span>
          <h3 className="text-3xl font-bold text-gray-800">Important Information</h3>
        </div>
        <p className="text-gray-700 leading-relaxed text-lg">
        This assessment tool prioritizes comprehensive detection and is designed to be cautious. 
          Results are most reliable in the lowest and highest ranges. While this system can help 
          identify potential concerns, it is not a diagnostic tool. A qualified healthcare professional 
          should always make the final determination regarding any skin lesion.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium shadow-sm text-lg"
        >
          Back to Scanner
        </button>
        <button
          className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm text-lg"
          onClick={() => window.print()}
        >
          Print Results
        </button>
      </div>
    </div>
  );
};

export default SkinResults; 