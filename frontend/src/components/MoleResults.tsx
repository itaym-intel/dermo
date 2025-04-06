import React, { useEffect, useState } from 'react';

interface ScanResult {
  diagnosis: string;
  positive: number;
  recommendations: string[];
}

interface MoleResultsProps {
  result: ScanResult;
  onBack: () => void;
  imageUrl: string;
}

const getRiskLevel = (score: number) => {
  if (score <= 0.3) return 'low';
  if (score <= 0.6) return 'uncertain';
  if (score <= 0.95) return 'increased';
  return 'high';
};

const getRiskInfo = (score: number) => {
  const level = getRiskLevel(score);
  
  const riskInfo = {
    low: {
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      title: '🔵 Low Risk',
      meaning: 'This result indicates a very low probability of skin cancer.',
      reliability: 'Highly reliable for identifying benign lesions, with nearly all harmless spots correctly classified in this range.',
      factors: 'Very early skin cancers, non-pigmented lesions, or spots in difficult-to-image locations may occasionally be missed. Poor image quality or extreme lighting can also impact results.',
      action: 'Continue routine skin monitoring and follow standard sun protection practices. Consult a healthcare provider if you notice significant changes.'
    },
    uncertain: {
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      title: '🟡 Uncertain Result',
      meaning: 'This result falls in a range where our system shows moderate uncertainty.',
      reliability: 'Our system prioritizes caution in this range, flagging many harmless spots to ensure potential concerns aren\'t missed.',
      factors: 'Common false positives include age spots, skin tags, harmless growths, visible blood vessels, and irritated moles. Scars, recent injuries, or skin conditions like eczema may also trigger this result.',
      action: 'Consider clinical evaluation if the lesion shows concerning changes or if you have risk factors for skin cancer.'
    },
    increased: {
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      title: '🟠 Increased Risk',
      meaning: 'This result indicates a potentially concerning lesion that warrants attention.',
      reliability: 'This score identifies features that could be associated with skin cancer and should be taken seriously, though clinical evaluation often provides reassurance.',
      factors: 'Common false positives include unusual-looking moles, certain birthmarks, sun spots, visible blood vessels, or rough/scaly growths. Recent injury or bleeding within a spot may also trigger this result.',
      action: 'Professional evaluation is advised to properly assess this lesion.'
    },
    high: {
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      title: '🔴 High Risk',
      meaning: 'This result represents our system\'s highest level of concern.',
      reliability: 'Most reliable for identifying concerning lesions, though some benign lesions may still receive this classification.',
      factors: 'Benign spots that may trigger false alarms include moles with recent bleeding, injured moles, certain unusual birthmarks, or moles with irregular features. Very dark skin tones may also experience higher false positive rates.',
      action: 'Prompt dermatological consultation is strongly recommended.'
    }
  };

  return riskInfo[level];
};

const MoleResults: React.FC<MoleResultsProps> = ({ result, onBack, imageUrl }) => {
  const riskInfo = getRiskInfo(result.positive);
  const confidencePercentage = (Math.abs(0.5 - result.positive) * 2).toFixed(1);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // Trigger animation after component mount
    setTimeout(() => {
      setBarWidth(Number(confidencePercentage));
    }, 100);
  }, [confidencePercentage]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Analysis Results</h2>
        <p className="text-gray-600">Your mole has been analyzed using our AI-powered system</p>
      </div>

      {/* Risk Level Section - Spans both columns */}
      <div className={`p-6 rounded-2xl ${riskInfo.bgColor} border-2 ${riskInfo.borderColor} shadow-lg mb-8`}>
        <div className="flex items-center gap-4 mb-6">
          <div className={`text-5xl ${riskInfo.color}`}>
            {riskInfo.title.split(' ')[0]}
          </div>
          <h3 className={`text-3xl font-bold ${riskInfo.color}`}>
            {riskInfo.title.split(' ').slice(1).join(' ')}
          </h3>
        </div>

        {/* Confidence Level */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h4 className="text-xl font-bold text-gray-800 mb-3">Confidence Level</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-gray-700">{confidencePercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="h-full rounded-full bg-blue-500 transition-all duration-1000 ease-out"
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* What This Means */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h4 className="text-3xl font-bold text-gray-800 mb-4">What This Means</h4>
            <p className="text-gray-700 leading-relaxed text-lg">{riskInfo.meaning}</p>
          </div>

          {/* Reliability */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h4 className="text-3xl font-bold text-gray-800 mb-4">Reliability</h4>
            <p className="text-gray-700 leading-relaxed text-lg">{riskInfo.reliability}</p>
          </div>

          {/* Factors */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h4 className="text-3xl font-bold text-gray-800 mb-4">Potential Factors Affecting Accuracy</h4>
            <p className="text-gray-700 leading-relaxed text-lg">{riskInfo.factors}</p>
          </div>

          {/* Recommendations */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h4 className="text-3xl font-bold text-gray-800 mb-4">Recommended Action</h4>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">{riskInfo.action}</p>
            
            <h4 className="text-3xl font-bold text-gray-800 mb-4">Additional Recommendations</h4>
            <ul className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className={`mt-1.5 ${riskInfo.color}`}>•</span>
                  <span className="text-gray-700 leading-relaxed text-lg">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col">
          {/* Photo Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Your Photo</h3>
            <div className="flex justify-center">
              <img 
                src={imageUrl} 
                alt="Uploaded mole" 
                className="max-w-full h-auto rounded-xl shadow-md"
              />
            </div>
          </div>

          {/* ABCDE Guide Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mt-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">ABCDE Rule Guide</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 flex-shrink-0">
                  <img src="/assets/svg/A.svg" alt="Asymmetry" className="w-full h-full" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">A - Asymmetry</h4>
                  <p className="text-gray-600">One half of the mole does not match the other half in shape, color, or texture.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 flex-shrink-0">
                  <img src="/assets/svg/B.svg" alt="Border" className="w-full h-full" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">B - Border</h4>
                  <p className="text-gray-600">The edges are irregular, ragged, notched, or blurred.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 flex-shrink-0">
                  <img src="/assets/svg/C.svg" alt="Color" className="w-full h-full" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">C - Color</h4>
                  <p className="text-gray-600">The color is not uniform and may include shades of brown, black, red, white, or blue.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 flex-shrink-0">
                  <img src="/assets/svg/D.svg" alt="Diameter" className="w-full h-full" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">D - Diameter</h4>
                  <p className="text-gray-600">The spot is larger than 6mm across (about the size of a pencil eraser).</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 flex-shrink-0">
                  <img src="/assets/svg/E.svg" alt="Evolving" className="w-full h-full" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">E - Evolving</h4>
                  <p className="text-gray-600">The mole is changing in size, shape, color, or has new symptoms like bleeding or itching.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Information - Spans both columns */}
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

      {/* Action Buttons - Below Important Information */}
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

export default MoleResults; 