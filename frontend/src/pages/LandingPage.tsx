import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { useState, useEffect, useRef } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        
        // Calculate progress based on scroll position
        const progress = Math.min(Math.max(scrollTop / (heroHeight - windowHeight), 0), 1);
        setScrollProgress(progress);
        
        // Show text when we reach 70% of the scroll progress
        const shouldShowText = progress >= 0.7;
        setIsTextVisible(shouldShowText);
      }
    };

    // Initial check
    handleScroll();
    
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

  return (
    <div className="min-h-screen bg-white">
      {isTextVisible && (
        <div 
          className="fixed top-0 left-0 right-0 z-50 transition-opacity duration-500"
          style={{
            opacity: isTextVisible ? 1 : 0,
          }}
        >
          <TopBar />
        </div>
      )}
      
      {/* Hero Section with Full Image */}
      <div ref={heroRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0">
            <img
              ref={imageRef}
              src="/assets/images/pierce_side_shot.png"
              alt="Dermatology Consultation"
              className="w-full h-full object-contain transition-transform duration-300"
              style={{
                transform: `scale(${4 - scrollProgress * 0.5})`,
                transformOrigin: 'center center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/20 to-white/90"></div>
          </div>
          
          <div 
            ref={textRef}
            className="relative h-full flex items-center transition-all duration-500"
            style={{
              opacity: isTextVisible ? 1 : 0,
              transform: `translateY(${isTextVisible ? 0 : 40}px)`,
            }}
          >
            <div className="container mx-auto px-6">
              <div className="max-w-2xl">
                <h1 className="text-6xl md:text-7xl font-display text-primary-900 mb-8 leading-tight tracking-tight">
                  <div className="opacity-90">Your Journey to</div>
                  <div className="mt-4"><span className="logo text-blue-600 animate-tracking-in-expand">Healthier Skin</span></div>
                  <div className="mt-4 opacity-90">Starts Here</div>
                </h1>
                <p className="text-xl text-primary-700/80 mb-12 leading-relaxed">
                  Get instant, accurate skin analysis and personalized recommendations from our AI-powered dermatology platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button 
                    onClick={() => navigate('/diagnosis')}
                    className="px-8 py-4 bg-blue-600/90 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-lg shadow-soft hover:shadow-card"
                  >
                    Start Diagnosis
                  </button>
                  <button className="px-8 py-4 bg-white/90 text-blue-600/90 border-2 border-blue-600/90 rounded-full hover:bg-blue-50/50 transition-colors font-medium text-lg">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic Tools Section */}
      <div className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display text-primary-900/90 mb-8">
              Our Diagnostic Tools
            </h2>
            <p className="text-xl text-primary-700/80 max-w-2xl mx-auto">
              Choose the right tool for your needs and get started with your skin health journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {scanners.map((scanner, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-3xl shadow-soft hover:shadow-card transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-blue-100/30 transform group-hover:scale-105 transition-transform duration-500"></div>
                  <div className="relative p-10">
                    <h3 className="text-3xl font-display text-primary-900/90 mb-4">{scanner.title}</h3>
                    <p className="text-primary-700/80 mb-8 text-lg leading-relaxed">{scanner.description}</p>
                    <button 
                      onClick={() => navigate(scanner.path)}
                      className="w-full px-8 py-4 bg-blue-600/90 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-lg shadow-soft hover:shadow-card"
                    >
                      Start {scanner.title}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-32 px-6 bg-blue-50/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display text-primary-900/90 mb-8">
              How It Works
            </h2>
            <p className="text-xl text-primary-700/80 max-w-2xl mx-auto">
              Simple steps to get your personalized skin analysis.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-50/50 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display text-primary-900/90 mb-4">Upload Image</h3>
              <p className="text-primary-700/80 text-lg">Take a clear photo of your skin condition or mole.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-50/50 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display text-primary-900/90 mb-4">AI Analysis</h3>
              <p className="text-primary-700/80 text-lg">Our advanced AI analyzes your image for potential concerns.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-50/50 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display text-primary-900/90 mb-4">Get Results</h3>
              <p className="text-primary-700/80 text-lg">Receive detailed analysis and personalized recommendations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;