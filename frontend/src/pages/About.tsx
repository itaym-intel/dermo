import { useState } from 'react';
import TopBar from '../components/TopBar';

// Dataset visualization component
const DatasetVisualization = () => {
  // Dataset statistics
  const datasetStats: Record<string, number> = {
    "Bite & Infestation Reactions": 1036,
    "Bullous & Blistering": 1404,
    "Depigmentation Disorders": 3023,
    "Infectious Lesions": 6173,
    "Inflammatory Red Patches": 5105,
    "Other": 1612,
    "Pigmented Lesions": 356962,
    "Tumor-like Growths": 5286,
    "Vascular Lesions": 1259
  };

  // Subfolder statistics for detailed view
  const subfolderStats: Record<string, Record<string, number>> = {
    "Bite & Infestation Reactions": {
      "Arthropod Bites": 585,
      "Infestations": 451
    },
    "Bullous & Blistering": {
      "Bullous Disorders": 446,
      "Drug Reactions": 958
    },
    "Depigmentation Disorders": {
      "Lichen Planus": 2117,
      "Lupus": 277,
      "Vitiligo": 629
    },
    "Infectious Lesions": {
      "Bacterial Infections": 990,
      "Candidiasis": 210,
      "Fungal Infections": 2541,
      "Viral Infections": 2432
    },
    "Inflammatory Red Patches": {
      "Eczema & Dermatitis": 3471,
      "Erythema Disorders": 496,
      "Photodermatoses": 91,
      "Pityriasis Rosea": 302,
      "Psoriasis": 745
    },
    "Other": {
      "Actinic Damage": 123,
      "Normal Skin": 1489
    },
    "Pigmented Lesions": {
      "Actinic Keratosis": 727,
      "Lentigo": 64,
      "Melanocytic Nevi (Moles)": 327365,
      "Melanoma": 27062,
      "Seborrheic Keratoses": 1744
    },
    "Tumor-like Growths": {
      "Basal Cell Carcinoma": 2633,
      "Benign Tumors": 2576,
      "Squamous Cell Carcinoma": 77
    },
    "Vascular Lesions": {
      "Urticaria": 300,
      "Vascular Tumors": 561,
      "Vasculitis": 398
    }
  };

  // Calculate total images
  const totalImages = Object.values(datasetStats).reduce((sum, count) => sum + count, 0);
  
  // Calculate percentages for pie chart
  const percentages = Object.entries(datasetStats).map(([category, count]) => ({
    category,
    count,
    percentage: (count / totalImages) * 100
  }));

  // Sort by count for bar chart
  const sortedCategories = [...percentages].sort((a, b) => b.count - a.count);

  // Colors for visualization
  const colors = [
    "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", 
    "#EC4899", "#6366F1", "#14B8A6", "#F97316"
  ];

  return (
    <div className="w-full">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-gray-800">Dataset Distribution</h3>
        <p className="text-gray-600">Total Images: {totalImages.toLocaleString()}</p>
      </div>
      
      {/* Bar Chart */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Images by Category</h4>
        <div className="space-y-2">
          {sortedCategories.map((item, index) => (
            <div key={item.category} className="relative">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{item.category}</span>
                <span className="text-sm font-medium text-gray-700">{item.count.toLocaleString()} ({item.percentage.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full" 
                  style={{ 
                    width: `${(item.count / sortedCategories[0].count) * 100}%`,
                    backgroundColor: colors[index % colors.length]
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pie Chart (Simplified) */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Distribution Overview</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {percentages.map((item, index) => (
            <div key={item.category} className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span className="text-sm text-gray-700">{item.category}: {item.percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Key Statistics */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Key Statistics</h4>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Largest category: <span className="font-medium">{sortedCategories[0].category}</span> with {sortedCategories[0].count.toLocaleString()} images</li>
          <li>• Smallest category: <span className="font-medium">{sortedCategories[sortedCategories.length - 1].category}</span> with {sortedCategories[sortedCategories.length - 1].count.toLocaleString()} images</li>
          <li>• Average category size: {(totalImages / sortedCategories.length).toLocaleString()} images</li>
          <li>• Total unique conditions: {Object.keys(subfolderStats).reduce((sum, category) => sum + Object.keys(subfolderStats[category]).length, 0)}</li>
        </ul>
      </div>
    </div>
  );
};

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
                  <DatasetVisualization />
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
                        <span className="text-gray-700">380,000+ high-quality images</span>
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