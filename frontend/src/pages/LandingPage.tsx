import { useNavigate } from 'react-router-dom';
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
            transformOrigin: 'center 70%',
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
            <h1 className="text-5xl md:text-6xl font-display mb-8 leading-snug">
              <div>Your Personal</div>
              <div>
                <span className="logo text-blue-600 animate-tracking-in-expand">Demtology</span>
              </div>
              <div>Smart Assistant</div>
            </h1>
            <p className="text-xl mb-12 leading-relaxed">
              Get instant, accurate skin analysis and personalized recommendations from our AI-powered dermatology platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => navigate('/diagnosis')}
                className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-lg shadow-card hover:shadow-hover"
              >
                Start Diagnosis
              </button>
              <button 
                onClick={handleLearnMoreClick}
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors font-medium text-lg"
              >
                Learn More
              </button>
            </div>
          </div>
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

          <div className="text-center mb-20">
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
              onClick={() => navigate('/login')}
              className="px-12 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-lg shadow-card hover:shadow-hover"
            >
              Get Started Now
            </button>
          </div>

          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-display text-primary-900 mb-6">
              What Our Users Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card p-6">
                <div className="text-4xl mb-4">⭐️</div>
                <h3 className="text-xl font-display text-primary-900 mb-2">Sarah M.</h3>
                <p className="text-primary-700">"The AI analysis was spot-on! It helped me catch a concerning mole early."</p>
              </div>
              <div className="card p-6">
                <div className="text-4xl mb-4">⭐️</div>
                <h3 className="text-xl font-display text-primary-900 mb-2">James L.</h3>
                <p className="text-primary-700">"Incredibly easy to use and the results were very detailed. Highly recommend!"</p>
              </div>
              <div className="card p-6">
                <div className="text-4xl mb-4">⭐️</div>
                <h3 className="text-xl font-display text-primary-900 mb-2">Emma R.</h3>
                <p className="text-primary-700">"Peace of mind at my fingertips. The platform is a game-changer for skin health."</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-display text-primary-900 mb-6">
              Simple Pricing
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="card p-6">
                <h3 className="text-xl font-display text-primary-900 mb-2">Basic Plan</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">$FREE.99/mo</p>
                <ul className="text-primary-700 mb-6">
                  <li>✓ 5 scans per month</li>
                  <li>✓ Basic analysis</li>
                  <li>✓ Email support</li>
                </ul>
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium">
                  Choose Plan
                </button>
              </div>
              <div className="card p-6">
                <h3 className="text-xl font-display text-primary-900 mb-2">Premium Plan</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">$FREE.99/mo</p>
                <ul className="text-primary-700 mb-6">
                  <li>✓ Unlimited scans</li>
                  <li>✓ Advanced analysis</li>
                  <li>✓ Priority support</li>
                  <li>✓ Expert consultation</li>
                </ul>
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium">
                  Choose Plan
                </button>
              </div>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="px-12 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-lg shadow-card hover:shadow-hover"
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