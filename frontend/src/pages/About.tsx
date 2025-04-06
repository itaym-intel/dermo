import React, { useState } from 'react';
import TopBar from '../components/TopBar';

const About = () => {
  // Model statistics - these would be updated with real data
  const modelStats = {
    accuracy: 94.2,
    precision: 92.8,
    recall: 91.5,
    f1Score: 92.1,
    classes: 28,
    images: 25000,
    trainingTime: "120 hours",
    lastUpdated: "June 2023"
  };

  // State for expanded table view
  const [isTableExpanded, setIsTableExpanded] = useState(false);

  // Skin disease statistics with model prediction capabilities
  const skinDiseaseStats = [
    { 
      name: "Acne", 
      modelIndex: 0,
      cases: "50 million", 
      prevalence: "15%", 
      impact: "Mild to Moderate",
      description: "A common skin condition that occurs when hair follicles plug with oil and dead skin cells."
    },
    { 
      name: "Actinic Keratosis", 
      modelIndex: 1,
      cases: "58 million", 
      prevalence: "17.5%", 
      impact: "Moderate",
      description: "A rough, scaly patch on the skin that develops from years of sun exposure."
    },
    { 
      name: "Benign Tumors", 
      modelIndex: 2,
      cases: "10 million", 
      prevalence: "3%", 
      impact: "Mild to Moderate",
      description: "Non-cancerous growths that can appear on the skin."
    },
    { 
      name: "Bullous Disorders", 
      modelIndex: 3,
      cases: "5 million", 
      prevalence: "1.5%", 
      impact: "Moderate to Severe",
      description: "Conditions characterized by fluid-filled blisters on the skin."
    },
    { 
      name: "Candidiasis", 
      modelIndex: 4,
      cases: "8 million", 
      prevalence: "2.4%", 
      impact: "Mild to Moderate",
      description: "A fungal infection caused by yeast that can affect the skin."
    },
    { 
      name: "Drug Eruption", 
      modelIndex: 5,
      cases: "12 million", 
      prevalence: "3.6%", 
      impact: "Mild to Severe",
      description: "Skin reactions caused by medications."
    },
    { 
      name: "Eczema", 
      modelIndex: 6,
      cases: "31.6 million", 
      prevalence: "10.1%", 
      impact: "Moderate to Severe",
      description: "A condition that makes your skin red and itchy."
    },
    { 
      name: "Infestations & Bites", 
      modelIndex: 7,
      cases: "15 million", 
      prevalence: "4.5%", 
      impact: "Mild to Moderate",
      description: "Skin conditions caused by parasites, insects, or other organisms."
    },
    { 
      name: "Lichen Planus", 
      modelIndex: 8,
      cases: "3 million", 
      prevalence: "0.9%", 
      impact: "Moderate",
      description: "An inflammatory condition that can affect the skin and mucous membranes."
    },
    { 
      name: "Lupus", 
      modelIndex: 9,
      cases: "1.5 million", 
      prevalence: "0.45%", 
      impact: "Severe",
      description: "An autoimmune disease that can cause skin rashes and other symptoms."
    },
    { 
      name: "Moles", 
      modelIndex: 10,
      cases: "100 million", 
      prevalence: "30%", 
      impact: "Mild",
      description: "Common growths on the skin that are usually harmless but should be monitored."
    },
    { 
      name: "Psoriasis", 
      modelIndex: 11,
      cases: "7.5 million", 
      prevalence: "2.2%", 
      impact: "Moderate to Severe",
      description: "A chronic autoimmune condition that causes rapid skin cell turnover."
    },
    { 
      name: "Rosacea", 
      modelIndex: 12,
      cases: "16 million", 
      prevalence: "5%", 
      impact: "Mild to Moderate",
      description: "A common skin condition that causes redness and visible blood vessels."
    },
    { 
      name: "Seborrheic Keratoses", 
      modelIndex: 13,
      cases: "83 million", 
      prevalence: "25%", 
      impact: "Mild",
      description: "Non-cancerous growths that commonly appear with aging."
    },
    { 
      name: "Skin Cancer", 
      modelIndex: 14,
      cases: "5.4 million", 
      prevalence: "1.6%", 
      impact: "Severe",
      description: "The abnormal growth of skin cells, most often developing on skin exposed to the sun."
    },
    { 
      name: "Sun Damage", 
      modelIndex: 15,
      cases: "90 million", 
      prevalence: "27%", 
      impact: "Mild to Moderate",
      description: "Damage to the skin caused by prolonged exposure to ultraviolet (UV) radiation."
    },
    { 
      name: "Tinea", 
      modelIndex: 16,
      cases: "20 million", 
      prevalence: "6%", 
      impact: "Mild to Moderate",
      description: "A fungal infection that can affect the skin, hair, and nails."
    },
    { 
      name: "Vascular Tumors", 
      modelIndex: 18,
      cases: "4 million", 
      prevalence: "1.2%", 
      impact: "Mild to Moderate",
      description: "Growths that involve blood vessels, such as hemangiomas."
    },
    { 
      name: "Vasculitis", 
      modelIndex: 19,
      cases: "2 million", 
      prevalence: "0.6%", 
      impact: "Moderate to Severe",
      description: "Inflammation of blood vessels that can cause skin changes."
    },
    { 
      name: "Vitiligo", 
      modelIndex: 20,
      cases: "1 million", 
      prevalence: "0.3%", 
      impact: "Mild to Moderate",
      description: "A condition that causes the skin to lose its color in patches."
    },
    { 
      name: "Warts", 
      modelIndex: 21,
      cases: "10 million", 
      prevalence: "3%", 
      impact: "Mild",
      description: "Small, rough growths caused by the human papillomavirus (HPV)."
    }
  ];

  // Get top 5 diseases for initial display
  const topDiseases = skinDiseaseStats.slice(0, 5);
  
  // Toggle table expansion
  const toggleTableExpansion = () => {
    setIsTableExpanded(!isTableExpanded);
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <div className="pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-display mb-8 text-center">
            <span className="px-6 py-2 bg-blue-600 text-white rounded-lg">
              About DermoAI
            </span>
          </h1>

          {/* Mission Statement */}
          <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              DermoAI is an open-source initiative dedicated to making dermatological AI accessible to everyone. 
              By leveraging cutting-edge machine learning technology, we aim to provide early detection of skin conditions, 
              reduce healthcare disparities, and empower individuals to take control of their skin health.
            </p>
          </div>

          {/* Real-World Impact */}
          <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Real-World Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
                  <h3 className="text-xl font-bold text-primary-800">Early Detection</h3>
                  <p className="text-gray-700">Early detection of melanoma can increase 5-year survival rates from 25% to 99%.</p>
                </div>
                <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
                  <h3 className="text-xl font-bold text-primary-800">Healthcare Access</h3>
                  <p className="text-gray-700">Our AI can reach underserved areas where dermatologists are scarce, bridging the healthcare gap.</p>
                </div>
                <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
                  <h3 className="text-xl font-bold text-primary-800">Cost Reduction</h3>
                  <p className="text-gray-700">Early screening can reduce treatment costs by up to 80% for serious skin conditions.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
                  <h3 className="text-xl font-bold text-primary-800">Patient Empowerment</h3>
                  <p className="text-gray-700">Gives individuals the tools to monitor their skin health and make informed decisions.</p>
                </div>
                <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
                  <h3 className="text-xl font-bold text-primary-800">Research Advancement</h3>
                  <p className="text-gray-700">Our open-source approach accelerates dermatological research and innovation.</p>
                </div>
                <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
                  <h3 className="text-xl font-bold text-primary-800">Global Reach</h3>
                  <p className="text-gray-700">Available in multiple languages, making skin health information accessible worldwide.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skin Disease Statistics */}
          <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Skin Disease Statistics</h2>
            <p className="text-gray-700 mb-4">
              Our AI model can predict 22 different skin conditions. Below are statistics for these conditions:
            </p>
            
            <div className="w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Condition</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Cases</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Prevalence</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Impact</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5 hidden md:table-cell">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(isTableExpanded ? skinDiseaseStats : topDiseases).map((disease, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{disease.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{disease.cases}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{disease.prevalence}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{disease.impact}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">{disease.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Expand/Collapse Button */}
            <div className="mt-4 flex justify-center">
              <button 
                onClick={toggleTableExpansion}
                className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                {isTableExpanded ? (
                  <>
                    <span>Show Less</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Show All {skinDiseaseStats.length} Conditions</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">* Statistics based on global data from WHO and dermatological associations</p>
          </div>

          {/* Dataset Information */}
          <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Our Dataset</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-sm">
                  <img 
                    src="/assets/images/dataset-visualization.png" 
                    alt="Dataset Visualization" 
                    className="w-full h-auto rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/600x400?text=Dataset+Visualization";
                    }}
                  />
                </div>
              </div>
              <div className="md:w-1/2 space-y-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-5 shadow-md">
                  <h3 className="text-4xl font-bold mb-2">The Largest Open-Source Skin Disease Dataset</h3>
                  <p className="text-lg">
                    We've collected and curated the most comprehensive publicly available skin classification dataset, 
                    making it accessible to researchers, developers, and healthcare professionals worldwide.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Our dataset is available on Kaggle at: 
                    <a 
                      href="https://www.kaggle.com/datasets/ethanreinhart/large-scale-skin-classification-dataset" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 ml-1 font-medium"
                    >
                      Large Scale Skin Classification Dataset
                    </a>
                  </p>
                  
                  <div className="p-5 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-sm">
                    <h3 className="text-xl font-bold text-primary-800 mb-3">Dataset Highlights</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span className="text-gray-700">450,000+ high-quality images</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span className="text-gray-700">22 different skin conditions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span className="text-gray-700">Diverse patient demographics</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span className="text-gray-700">Expert-verified diagnoses</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span className="text-gray-700">Regular updates and expansions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Model Statistics */}
          <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Model Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-primary-800">Accuracy</h3>
                    <span className="text-2xl font-bold text-blue-600">{modelStats.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${modelStats.accuracy}%` }}></div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-primary-800">Precision</h3>
                    <span className="text-2xl font-bold text-blue-600">{modelStats.precision}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${modelStats.precision}%` }}></div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-primary-800">Recall</h3>
                    <span className="text-2xl font-bold text-blue-600">{modelStats.recall}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${modelStats.recall}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-primary-800">F1 Score</h3>
                    <span className="text-2xl font-bold text-blue-600">{modelStats.f1Score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${modelStats.f1Score}%` }}></div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
                  <h3 className="text-xl font-bold text-primary-800">Model Details</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Classes: {modelStats.classes}</li>
                    <li>Training Images: {modelStats.images}</li>
                    <li>Training Time: {modelStats.trainingTime}</li>
                    <li>Last Updated: {modelStats.lastUpdated}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-card p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl mb-6">
              Help us make dermatological AI accessible to everyone. Contribute to our open-source project or use our API in your applications.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="https://github.com/yourusername/dermoai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-colors font-medium shadow-sm"
              >
                GitHub Repository
              </a>
              <a 
                href="/contact" 
                className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-colors font-medium shadow-sm"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;