import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';

const DiagnosisPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display text-primary-900 mb-8 leading-snug">
              <div>Your Journey to</div>
              <div><span className="logo text-blue-600 animate-tracking-in-expand">Healthier Skin</span></div>
              <div>Starts Here</div>
            </h1>
            <p className="text-xl text-primary-700 max-w-2xl mx-auto leading-relaxed">
              Choose from our advanced diagnostic tools to get personalized insights about your skin health.
            </p>
          </div>

          {/* Scanner Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <Link to="/mole-scanner" className="group">
              <div className="relative overflow-hidden rounded-3xl shadow-card hover:shadow-hover transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-display text-primary-900">Mole Scanner</h2>
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-primary-700 mb-6">Monitor and analyze your moles for any concerning changes or patterns. Our AI helps track changes over time and provides early detection insights.</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Start Analysis
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/skin-scanner" className="group">
              <div className="relative overflow-hidden rounded-3xl shadow-card hover:shadow-hover transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-display text-primary-900">Skin Scanner</h2>
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-primary-700 mb-6">Get a comprehensive analysis of your skin condition with our AI technology. Perfect for monitoring overall skin health and identifying potential concerns.</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Start Analysis
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* How It Works Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-display text-primary-900 mb-12">
              How Our Diagnosis Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display text-primary-900 mb-2">Upload Your Image</h3>
                <p className="text-primary-700">Take a clear, well-lit photo of your skin or mole following our guidelines.</p>
              </div>
              <div className="card p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display text-primary-900 mb-2">AI Analysis</h3>
                <p className="text-primary-700">Our advanced AI analyzes your image using dermatology-trained algorithms.</p>
              </div>
              <div className="card p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display text-primary-900 mb-2">Get Results</h3>
                <p className="text-primary-700">Receive detailed analysis and personalized recommendations within minutes.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-display text-primary-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card p-6 text-left">
                <h3 className="text-xl font-display text-primary-900 mb-2">How accurate is the analysis?</h3>
                <p className="text-primary-700">Our AI has been trained on millions of dermatology cases and maintains a high accuracy rate. However, it should be used as a supplementary tool and not replace professional medical advice.</p>
              </div>
              <div className="card p-6 text-left">
                <h3 className="text-xl font-display text-primary-900 mb-2">Is my data secure?</h3>
                <p className="text-primary-700">Yes, we use end-to-end encryption and follow strict privacy protocols. Your images and data are never shared without your consent.</p>
              </div>
              <div className="card p-6 text-left">
                <h3 className="text-xl font-display text-primary-900 mb-2">How often should I scan?</h3>
                <p className="text-primary-700">For general skin health, we recommend monthly scans. For mole monitoring, scans every 3-6 months are ideal to track changes over time.</p>
              </div>
              <div className="card p-6 text-left">
                <h3 className="text-xl font-display text-primary-900 mb-2">Can I share results with my doctor?</h3>
                <p className="text-primary-700">Absolutely! You can easily export and share your analysis results with healthcare professionals for further consultation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisPage; 