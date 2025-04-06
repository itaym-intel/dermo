import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollPosition(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate zoom scale based on scroll position
  const getZoomScale = () => {
    const maxScroll = 16000;
    const minScale = 0.5;
    const maxScale = 1.2; // Reduced from 1.5 to 1.2 for less initial zoom
    const scale = Math.max(minScale, maxScale - (scrollPosition / maxScroll));
    return scale;
  };

  // Calculate opacity for text based on scroll position
  const getTextOpacity = () => {
    const maxScroll = 1000;
    const fadeStart = 800;
    if (scrollPosition < fadeStart) return 0;
    return Math.min(1, (scrollPosition - fadeStart) / (maxScroll - fadeStart));
  };

  // Calculate blur amount based on scroll position
  const getBlurAmount = () => {
    const maxScroll = 1000;
    const blurStart = 800;
    if (scrollPosition < blurStart) return 0;
    return Math.min(10, (scrollPosition - blurStart) / (maxScroll - blurStart) * 10);
  };

  const handleLearnMoreClick = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <div 
        className="fixed inset-0 bg-white"
        style={{
          zIndex: 10,
          height: '100vh',
        }}
      >
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={{
            transform: `scale(${getZoomScale()})`,
            transformOrigin: 'center 60%',
            filter: `blur(${getBlurAmount()}px)`,
          }}
        >
          <img
            src="/assets/images/pierce_side_shot.png"
            alt="Pierce Englund"
            className="w-full h-full object-cover"
          />
        </div>
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: 1 - (scrollPosition / 800),
            transition: 'opacity 0.5s ease-out',
          }}
        >
          <div className="text-center text-white max-w-2xl px-6">
            <h1 className="text-5xl md:text-8xl font-display mb-10 leading-snug drop-shadow-lg">
              <div>Your Personal</div>
              <div>
                <span className="logo text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 text-bold drop-shadow-lg">Dermatology</span>
              </div>
              <div>Smart Assistant</div>
            </h1>
            <p className="text-2xl mb-16 leading-relaxed">
              Get instant, accurate skin, mole, and cancer analysis with personalized recommendations from our AI-powered dermatology platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <button 
                onClick={() => navigate('/diagnosis')}
                className="px-10 py-5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-xl shadow-card hover:shadow-hover"
              >
                Start Diagnosis
              </button>
              <button 
                onClick={handleLearnMoreClick}
                className="px-10 py-5 bg-white text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors font-medium text-xl"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Arrow */}
      <div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 transition-opacity duration-500"
        style={{
          opacity: Math.max(0, 1 - (scrollPosition / 400)),
        }}
      >
        <div className="animate-bounce">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-white drop-shadow-lg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>

      <div 
        ref={contentRef}
        className="relative z-20"
        style={{
          marginTop: '100vh',
          minHeight: '100vh',
        }}
      >
        <div 
          className="container mx-auto max-w-6xl px-6 py-20"
          style={{
            opacity: getTextOpacity(),
            transition: 'opacity 0.5s ease-out',
            pointerEvents: scrollPosition < 800 ? 'none' : 'auto',
          }}
        >

        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 text-bold mb-8 drop-shadow-lg">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="card p-8">
              <div className="text-5xl mb-6 filter grayscale">📸</div>
              <h3 className="text-4xl font-display text-primary-900 mb-4">Upload Image</h3>
              <p className="text-xl text-primary-700">Take a clear photo of your skin condition or mole.</p>
            </div>
            <div className="card p-8">
              <div className="text-5xl mb-6 filter grayscale">🤖</div>
              <h3 className="text-4xl font-display text-primary-900 mb-4">AI Analysis</h3>
              <p className="text-xl text-primary-700">Our advanced AI analyzes your image for potential concerns.</p>
            </div>
            <div className="card p-8">
              <div className="text-5xl mb-6 filter grayscale">📋</div>
              <h3 className="text-4xl font-display text-primary-900 mb-4">Get Results</h3>
              <p className="text-xl text-primary-700">Receive detailed analysis and personalized recommendations.</p>
            </div>
          </div>
        </div>

        {/* Scanner Cards */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 text-bold mb-8 drop-shadow-lg">
            Our Models
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <Link to="/mole-scanner" className="group">
                <div className="relative overflow-hidden rounded-3xl shadow-card hover:shadow-hover transition-all duration-300 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-white transform group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative p-8 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-4xl font-display text-primary-900 drop-shadow-lg">Mole Scanner</h2>
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xl text-primary-700 mb-8 flex-grow">Monitor and analyze your moles for any concerning changes or patterns. Our AI compares your moles against known cancer indicators and helps track changes over time for early detection of potential skin cancer.</p>
                    <div className="flex items-center text-blue-600 font-medium text-xl">
                      Start Analysis
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/skin-scanner" className="group">
                <div className="relative overflow-hidden rounded-3xl shadow-card hover:shadow-hover transition-all duration-300 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-white transform group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative p-8 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-4xl font-display text-primary-900 drop-shadow-lg">Skin Scanner</h2>
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xl text-primary-700 mb-8 flex-grow">Get a comprehensive analysis of any skin condition. From rashes and acne to eczema and psoriasis. Our AI technology helps identify and monitor various skin conditions with detailed insights and recommendations.</p>
                    <div className="flex items-center text-blue-600 font-medium text-xl">
                      Start Analysis
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 text-bold mb-8 drop-shadow-lg">
              Why Dermo?
            </h2>
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="card p-8">
                <h3 className="text-4xl font-display text-primary-900 mb-4 drop-shadow-md">Custom-Trained Models</h3>
                <p className="text-xl text-primary-700">Our machine learning models are specifically designed and trained for dermatology applications, ensuring accurate and reliable analysis.</p>
              </div>
              <div className="card p-8">
                <h3 className="text-4xl font-display text-primary-900 mb-4 drop-shadow-md">Largest Public Dataset</h3>
                <p className="text-xl text-primary-700">Our Skin Scanner leverages the largest publicly available collection of dermatology images and data to provide comprehensive and accurate analysis.</p>
              </div>
              <div className="card p-8">
                <h3 className="text-4xl font-display text-primary-900 mb-4 drop-shadow-md">Open Source and Transparent</h3>
                <p className="text-xl text-primary-700">Our models and datasets are open source and transparent, so you can see how the models work, how they are trained, and what they are trained on.</p>
              </div>
              <div className="card p-8">
                <h3 className="text-4xl font-display text-primary-900 mb-4 drop-shadow-md">Personalized Recommendations</h3>
                <p className="text-xl text-primary-700">Receive immediate tailored treatment plans and skincare recommendations based on your specific condition and skin type.</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="px-14 py-5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-xl shadow-card hover:shadow-hover"
            >
              Get Started Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;