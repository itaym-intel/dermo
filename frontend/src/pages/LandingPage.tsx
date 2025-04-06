import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';

const LandingPage = () => {
  const navigate = useNavigate();

  const scanners = [
    {
      title: 'Skin Scanner',
      description: 'Get a comprehensive analysis of your skin condition with our AI technology.',
      path: '/skin-scanner',
    },
    {
      title: 'Mole Scanner',
      description: 'Monitor and analyze your moles for any concerning changes or patterns.',
      path: '/mole-scanner',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 animate-slide-up">
              <h1 className="text-5xl md:text-6xl font-display text-primary-900 mb-8 leading-snug">
                <div>
                  Your Personal 
                </div>
                <div>
                  <span className="logo text-blue-600 animate-tracking-in-expand">Dermatology</span>
                </div>
                <div>
                  Smart Assistant
                </div>
              </h1>
              <p className="text-xl text-primary-700 mb-12 leading-relaxed">
                Get instant, accurate skin analysis and personalized recommendations from our AI-powered dermatology platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => navigate('/diagnosis')}
                  className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-lg shadow-card hover:shadow-hover"
                >
                  Start Diagnosis
                </button>
                <button className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors font-medium text-lg">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 animate-slide-up">
              <div className="relative max-w-md">
                <div className="absolute inset-0 bg-blue-100 rounded-3xl transform rotate-3"></div>
                <img
                  src="/src/assets/images/pierce_side_shot.png"
                  alt="Pierce Englund"
                  className="relative w-full h-auto rounded-2xl shadow-card object-cover"
                />
              </div>
            </div>
          </div>

          <div className="container mx-auto max-w-6xl px-6 pt-20">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-display text-primary-900 mb-6">
                Our Diagnostic Tools
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {scanners.map((scanner, index) => (
                  <div key={index} className="card p-6">
                    <h3 className="text-2xl font-display text-primary-900 mb-4">{scanner.title}</h3>
                    <p className="text-primary-700 mb-6">{scanner.description}</p>
                    <button 
                      onClick={() => navigate(scanner.path)}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-card hover:shadow-hover"
                    >
                      Start {scanner.title}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-display text-primary-900 mb-6">
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="card p-6">
                  <div className="text-4xl mb-4">📸</div>
                  <h3 className="text-xl font-display text-primary-900 mb-2">Upload Image</h3>
                  <p className="text-primary-700">Take a clear photo of your skin condition or mole.</p>
                </div>
                <div className="card p-6">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-xl font-display text-primary-900 mb-2">AI Analysis</h3>
                  <p className="text-primary-700">Our advanced AI analyzes your image for potential concerns.</p>
                </div>
                <div className="card p-6">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="text-xl font-display text-primary-900 mb-2">Get Results</h3>
                  <p className="text-primary-700">Receive detailed analysis and personalized recommendations.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-display text-primary-900 mb-6">
                Why Choose Dermo?
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="card p-6">
                  <h3 className="text-xl font-display text-primary-900 mb-2">Instant Results</h3>
                  <p className="text-primary-700">Get your analysis in seconds, not days or weeks.</p>
                </div>
                <div className="card p-6">
                  <h3 className="text-xl font-display text-primary-900 mb-2">Privacy First</h3>
                  <p className="text-primary-700">Your data is encrypted and never shared without consent.</p>
                </div>
                <div className="card p-6">
                  <h3 className="text-xl font-display text-primary-900 mb-2">Expert-Backed</h3>
                  <p className="text-primary-700">Our AI is trained by dermatology experts.</p>
                </div>
                <div className="card p-6">
                  <h3 className="text-xl font-display text-primary-900 mb-2">Always Available</h3>
                  <p className="text-primary-700">Access our platform anytime, anywhere.</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/diagnosis')}
                className="px-12 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-lg shadow-card hover:shadow-hover"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;