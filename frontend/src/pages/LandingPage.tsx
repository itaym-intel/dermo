import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AssignmentIcon from '@mui/icons-material/Assignment';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollPosition(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements with the 'animate-on-scroll' class
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Calculate content section opacity based on scroll position
  const getContentOpacity = () => {
    const fadeStart = window.innerHeight * 0.3;
    const fadeEnd = window.innerHeight * 0.7;
    if (scrollPosition < fadeStart) return 0;
    if (scrollPosition > fadeEnd) return 1;
    return (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
  };

  // Helper function to get animation class
  const getAnimationClass = (id: string) => {
    // Hero section elements should be immediately visible
    if (id.startsWith('hero-')) {
      return 'opacity-100 translate-y-0';
    }
    return visibleElements.has(id) ? 'animate-slide-up' : 'opacity-0 translate-y-8';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/images/pierce_side_shot.png"
            alt="Dermo AI"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900-600-grad"/>
        </div>
        
        <div className="relative h-screen flex items-center z-10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl text-white">
              <h1 
                className="text-6xl md:text-8xl font-bold mb-6 leading-tight animate-on-scroll" 
                id="hero-title"
                style={{ opacity: 1, transform: 'translateY(0)' }}
              >
                Your Personal<br />
                <span className="text-blue-300">Dermatology</span><br />
                Smart Assistant
              </h1>
              <p 
                className="text-xl md:text-2xl mb-8 text-blue-100 animate-on-scroll" 
                id="hero-subtitle"
                style={{ opacity: 1, transform: 'translateY(0)' }}
              >
                Get instant, accurate skin, mole, and cancer analysis with personalized recommendations from our AI-powered dermatology platform.
              </p>
              <div 
                className="flex flex-col sm:flex-row gap-4 animate-on-scroll" 
                id="hero-buttons"
                style={{ opacity: 1, transform: 'translateY(0)' }}
              >
                <div className="bg-blue-900-600-grad rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl">
                  <button 
                    onClick={() => navigate('/diagnosis')}
                    className="px-8 py-4 bg-blue-900-600-grad text-white rounded-lg hover:opacity-90 transition-all font-medium text-lg shadow-lg hover:shadow-xl outline-none border-0 appearance-none"
                  >
                    Start Diagnosis
                  </button>
                </div>
                <button 
                  onClick={() => contentRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-lg"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
          onClick={() => contentRef.current?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="animate-bounce">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-white" 
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
      </section>

      {/* Content Section */}
      <section 
        ref={contentRef}
        className="relative bg-white"
        style={{
          opacity: getContentOpacity(),
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <div className="container mx-auto px-6 py-20">
          {/* How It Works Section */}
          <div className="text-center mb-20">
            <h2 
              className="text-4xl md:text-6xl font-bold text-blue-900 mb-8 mt-20 animate-on-scroll" 
              id="how-it-works-title"
              style={{ opacity: visibleElements.has('how-it-works-title') ? 1 : 0, transform: visibleElements.has('how-it-works-title') ? 'translateY(0)' : 'translateY(20px)' }}
            >
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div 
                className={`bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300 animate-on-scroll ${getAnimationClass('step-1')}`} 
                id="step-1"
              >
                <div className="mb-6 [filter:sepia(1)_saturate(2)_hue-rotate(180deg)_brightness(0.7)_contrast(0.8)]">
                  <CameraAltIcon sx={{ fontSize: 48 }} />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Upload Image</h3>
                <p className="text-gray-600">Take a clear photo of your skin condition or mole.</p>
              </div>
              <div 
                className={`bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300 animate-on-scroll ${getAnimationClass('step-2')}`} 
                id="step-2"
              >
                <div className="mb-6 [filter:sepia(1)_saturate(2)_hue-rotate(180deg)_brightness(0.7)_contrast(0.8)]">
                  <SmartToyIcon sx={{ fontSize: 48 }} />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">AI Analysis</h3>
                <p className="text-gray-600">Our advanced AI analyzes your image for potential concerns.</p>
              </div>
              <div 
                className={`bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300 animate-on-scroll ${getAnimationClass('step-3')}`} 
                id="step-3"
              >
                <div className="mb-6 [filter:sepia(1)_saturate(2)_hue-rotate(180deg)_brightness(0.7)_contrast(0.8)]">
                  <AssignmentIcon sx={{ fontSize: 48 }} />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Get Results</h3>
                <p className="text-gray-600">Receive detailed analysis and personalized recommendations.</p>
              </div>
            </div>
          </div>

          {/* Scanner Cards */}
          <div className="text-center mb-12">
            <h2 
              className="text-4xl md:text-6xl font-bold text-blue-900 mb-8 animate-on-scroll" 
              id="models-title"
              style={{ opacity: visibleElements.has('models-title') ? 1 : 0, transform: visibleElements.has('models-title') ? 'translateY(0)' : 'translateY(20px)' }}
            >
              Our Models
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <Link 
              to="/mole-scanner" 
              className={`group animate-on-scroll ${getAnimationClass('mole-scanner')}`} 
              id="mole-scanner"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-blue-900-600-grad opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8 text-white">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Mole Scanner</h2>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-lg mb-8">Monitor and analyze your moles for any concerning changes or patterns. Our AI compares your moles against known cancer indicators and helps track changes over time for early detection of potential skin cancer.</p>
                  <div className="flex items-center text-white font-medium text-lg">
                    Start Analysis
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            <Link 
              to="/skin-scanner" 
              className={`group animate-on-scroll ${getAnimationClass('skin-scanner')}`} 
              id="skin-scanner"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-blue-900-600-grad opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8 text-white">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Skin Scanner</h2>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-lg mb-8">Get a comprehensive analysis of any skin condition. From rashes and acne to eczema and psoriasis. Our AI technology helps identify and monitor various skin conditions with detailed insights and recommendations.</p>
                  <div className="flex items-center text-white font-medium text-lg">
                    Start Analysis
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Why Dermo Section */}
          <div className="text-center mb-20">
            <h2 
              className="text-4xl md:text-6xl font-bold text-blue-900 mb-8 animate-on-scroll" 
              id="why-dermo-title"
              style={{ opacity: visibleElements.has('why-dermo-title') ? 1 : 0, transform: visibleElements.has('why-dermo-title') ? 'translateY(0)' : 'translateY(20px)' }}
            >
              Why Dermo?
            </h2>
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div 
                className={`bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300 animate-on-scroll ${getAnimationClass('feature-1')}`} 
                id="feature-1"
              >
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Custom-Trained Models</h3>
                <p className="text-gray-600">Our machine learning models are specifically designed and trained for dermatology applications, ensuring accurate and reliable analysis.</p>
              </div>
              <div 
                className={`bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300 animate-on-scroll ${getAnimationClass('feature-2')}`} 
                id="feature-2"
              >
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Largest Public Dataset</h3>
                <p className="text-gray-600">Our Skin Scanner leverages the largest publicly available collection of dermatology images and data to provide comprehensive and accurate analysis.</p>
              </div>
              <div 
                className={`bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300 animate-on-scroll ${getAnimationClass('feature-3')}`} 
                id="feature-3"
              >
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Open Source and Transparent</h3>
                <p className="text-gray-600">Our models and datasets are open source and transparent, so you can see how the models work, how they are trained, and what they are trained on.</p>
              </div>
              <div 
                className={`bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300 animate-on-scroll ${getAnimationClass('feature-4')}`} 
                id="feature-4"
              >
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Personalized Recommendations</h3>
                <p className="text-gray-600">Receive immediate tailored treatment plans and skincare recommendations based on your specific condition and skin type.</p>
              </div>
            </div>
            <div className="opacity-90 hover:opacity-100 transition-all">
              <button 
                onClick={() => navigate('/login')}
                className={`px-8 py-4 bg-blue-900-600-grad text-white rounded-lg transition-all font-medium text-lg shadow-xl outline-none border-0 appearance-none animate-on-scroll ${getAnimationClass('cta-button')}`}
                id="cta-button"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .animate-on-scroll.animate-slide-up {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;